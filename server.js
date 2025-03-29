if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const path = require('path')
const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const User = require('./models/User');
const UserStats = require('./models/UserStats');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit')
const { v4: uuidv4 } = require('uuid')
const {body, validationResult} = require('express-validator')
const csurf = require('csurf')
const passport = require('passport');
const nodemailer = require('nodemailer');

// database Connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

// nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// function for email verification
const sendVerificationEmail = async (userEmail, userID) => {
    const verificationLink = `http://localhost:30000/verify-email?token=${userID}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Verify Your Email',
        html: `<p>Click the link below to verify your email:</p>
               <a href="${verificationLink}">${verificationLink}</a>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${userEmail}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "*", // allow all origins
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`🟢 New connection: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`🔴 User disconnected: ${socket.id}`);
    });
});




const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// more middleware
const initializePassport = require('./passport-config');
initializePassport(
    passport,
    async email => await User.findOne({ email: email }),
    async userID => await User.findOne({ userID: userID }),
);
app.use(flash());

const session_middleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
});

app.use(session_middleware)

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((err, req, res, next) => {
    console.error(err.stack); // log internally
    res.status(500).json({ message: 'Something went wrong.' });
});
app.use(express.static(path.join(__dirname, 'public'), { // limit info on directory
    dotfiles: 'deny',
    extensions: ['html', 'css', 'js']
}));
app.set('view engine', 'ejs');
app.use(csurf())
app.use((req, res, next)=>{
    res.locals.csrfToken = req.csrfToken();
    next();
})

// authentication Middleware
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

// enforce rate limit for login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts
    message: 'Too many login attempts, please try again later.',
});

// routes
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name });
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
});

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs', 
        { 
            errors: [],
            name: '', 
            email: '' 
        });
});


// enforce rate limit for register attempts
const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 registration attempts
    message: 'Too many registration attempts, please try again later.',
});

app.post('/register', checkNotAuthenticated, registerLimiter, [
    body('name').trim().isLength({ min: 3 }).escape().withMessage('Name must be at least 3 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
], async (req, res) => {
    const errors = validationResult(req);

    // if validation errors exist, return them
    if (!errors.isEmpty()) {
        return res.status(400).render('register.ejs', {
            errors: errors.array(),
            name: req.body.name,
            email: req.body.email
        });
    }
    

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userID = uuidv4();

        const user = new User({
            userID: userID,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            verified: true // no email verification for now; set to false later
        });

        await user.save();

        res.status(200).render('login.ejs',
            { message: ["Registration successful!"],
              csrfToken: req.csrfToken()


            });
    } catch (e) {
        if (e.code === 11000 && e.keyPattern && e.keyPattern.email){
            // error code for duplicate email
            return res.status(400).render('register.ejs',{
                errors: [{ path: 'email', msg: 'Email is already registered' }],
                csrfToken: req.csrfToken(),
                name: req.body.name,
                email: req.body.email
            })
        }
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post('/logout', (req, res, next) => {
    req.csrfToken = () => ''; // no-op
    next(); // skipping csrf middleware
}, (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy(() => {
            res.redirect('/login');
        });
    });
});

app.post('/login', checkNotAuthenticated, loginLimiter, async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res, next);
});

app.get('/falloutCM', checkAuthenticated, (req, res) => {
    res.render('falloutCM.ejs', { 
        name: req.user.name,
        csrfToken: req.csrfToken()
    });
});

app.get('/falloutGuide', checkAuthenticated, (req, res) =>{
    res.render('falloutGuide.ejs', {
        name: req.user.name,
        csrfToken: req.csrfToken()
    });
});


app.post('/saveStats', checkAuthenticated, async (req, res) => {
    console.log(req.headers['_csrf'])
    const stats = req.body.stats;
    const userID = req.user.userID;
    if (!userID) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        const result = await UserStats.findOneAndUpdate(
            { userID: userID },
            { name: req.user.name, stats: stats },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        res.status(200).json({ message: 'Stats saved successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving stats', error: error.toString() });
        console.log(error);
    }
});

app.get('/getStats', checkAuthenticated, async (req, res) => {
    try {
        const userStats = await UserStats.findOne({ userID: req.user.userID });
        if (userStats) {
            res.status(200).json(userStats.stats);
        } else {
            res.status(404).json({ message: 'No stats found for this user.' });
        }
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Error fetching stats.' });
    }
});

// Verification route
app.get('/verify-email', async (req, res) => {
    const { token } = req.query; // extract token from URL

    if (!token) {
        return res.status(400).send('Invalid verification link.');
    }

    try {
        const user = await User.findOne({ userID: token });

        if (!user) {
            return res.status(404).send('User not found.');
        }

        if (user.verified) {
            return res.send('Email already verified.');
        }

        user.verified = true; // mark user as verified
        await user.save();

        res.send('Email verified successfully! You can now log in.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error verifying email.');
    }
});

io.use((socket, next) => {
    session_middleware(socket.request, {}, next);
});

io.use((socket, next) => { // auth check
    console.log("Socket request headers:", socket.request.headers);
    console.log("Socket request session:", socket.request.session);
    if (!socket.request.session || !socket.request.session.passport) {
        console.log("Authentication error: No session found");
        return next(new Error('Authentication error'));
    }
    socket.user = socket.request.session.passport.user;
    console.log(`User authenticated: ${socket.user}`);
    next();
});

const MAX_MESSAGE_LENGTH = 500;
const ALLOWED_PATTERN = /^[a-zA-Z0-9 .,!?'"()-]+$/;

io.on('connection', (socket) => {
    const req = socket.request;

    // session-based chat history
    if (!req.session.chatHistory) {
        req.session.chatHistory = [];
    }

    // send existing chat history to the client upon connection
    socket.emit('chat history', req.session.chatHistory);

    socket.on('chat message', ({ username, message }) => {
        if (message.length > MAX_MESSAGE_LENGTH || !ALLOWED_PATTERN.test(message)) {
            console.log('Blocked message.');
            return;
        }

        const chatEntry = { username, message, timestamp: new Date() };
        req.session.chatHistory.push(chatEntry);

        // save session changes
        req.session.save((err) => {
            if (err) console.error('Session save error:', err);
        });

        io.emit('chat message', chatEntry);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected.');
    });
});


app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        console.warn('Invalid CSRF token');

        // clearing session
        req.session = null;

        // json error
        if (req.headers['content-type'] === 'application/json') {
            return res.status(403).json({ message: 'Invalid CSRF token. Please refresh the page or log in again.' });
        }

        // or, redirect back to login
        return res.redirect('/login');
    }

    // misc. errors
    next(err);
});

// starting server
const PORT = 30000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
