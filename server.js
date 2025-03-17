if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const path = require('path')
const express = require('express');
const http = require('http'); // Required for creating the server
const { Server } = require('socket.io'); // Import Socket.IO
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

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

// Nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS  // Your Gmail App Password
    }
});

// Function to send verification email
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
const server = http.createServer(app); // Create HTTP server for Socket.IO
const io = require('socket.io')(server); // Pass your Express server to Socket.IO

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const initializePassport = require('./passport-config');
initializePassport(
    passport,
    async email => await User.findOne({ email: email }),
    async userID => await User.findOne({ userID: userID }),
);
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json()); // For parsing JSON for POST requests
app.use((err, req, res, next) => {
    console.error(err.stack); // Log internally; stop giving specific errors to users via console
    res.status(500).json({ message: 'Something went wrong.' });
});
app.use(express.static(path.join(__dirname, 'public'), { // Limit info on directory
    dotfiles: 'deny',
    extensions: ['html', 'css', 'js']
}));
// Middleware
app.set('view-engine', 'ejs');
app.use(csurf())
app.use((req, res, next)=>{
    res.locals.csrfToken = req.csrfToken();
    next();
})



// Authentication Middleware
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

// Routes
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name });
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
});

// enforce rate limit for login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts
    message: 'Too many login attempts, please try again later.',
});

app.post('/login', checkNotAuthenticated, loginLimiter, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs', 
        { 
            errors: [],
            csrfToken: req.csrfToken(), 
            name: '', 
            email: '' 
        });
});


// enforce rate limit for register attempts
const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts
    message: 'Too many registration attempts, please try again later.',
});

app.post('/register', checkNotAuthenticated, registerLimiter, [
    body('name').trim().isLength({ min: 3 }).escape().withMessage('Name must be at least 3 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
], async (req, res) => {
    const errors = validationResult(req);

    // If validation errors exist, return them in the required format
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(error => ({
            type: "field",
            value: req.body[error.path], // Extracting value from request body
            msg: error.msg,
            path: error.path,
            location: error.location
        })) });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userID = uuidv4();

        const user = new User({
            userID: userID,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            verified: false // Set default as false until verified
        });

        await user.save();

        // Send verification email
        await sendVerificationEmail(req.body.email, userID);

        res.status(200).json({ message: "Registration successful! Please verify your email." });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
});


/*
app.post('/register', checkNotAuthenticated, registerLimiter,[
    body('name').trim().isLength({min:3}).escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({min:8}).withMessage('Password must be at least 8 characters')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            userID: uuidv4(), // using uuid for unique user ids
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();
        res.redirect('/login');
    } catch (e) {
        console.log(e);
        res.redirect('/register');
    }
});
*/

app.post('/logout', (req, res, next) => {
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

    if (!user.verified) {
        return res.status(403).json({ message: "Please verify your email before logging in." });
    }

    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res, next);
});

// Fallout Dice and Character Sheet Routes
app.get('/falloutDice', checkAuthenticated, (req, res) => {
    res.render('falloutDice.ejs', { name: req.user.name });
});

app.get('/falloutCM', checkAuthenticated, (req, res) => {
    res.render('falloutCM.ejs', { name: req.user.name });
});

app.post('/saveStats', checkAuthenticated, async (req, res) => {
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
        res.status(200).send('Stats saved successfully.');
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
    const { token } = req.query; // Extract token from URL

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

        user.verified = true; // Mark user as verified
        await user.save();

        res.send('Email verified successfully! You can now log in.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error verifying email.');
    }
});

io.use((socket, next) => {
    if (!socket.request.session || !socket.request.session.passport) {
        return next(new Error('Authentication error'));
    }
    socket.user = socket.request.session.passport.user;
    next();
});

const MAX_MESSAGE_LENGTH = 500; // Set a limit for message length
const ALLOWED_PATTERN = /^[a-zA-Z0-9 .,!?'"()-]+$/; // Only allow safe characters

io.on('connection', (socket) => {
    console.log('A user connected.');

    socket.on('chat message', ({ username, message }) => {
        // Reject overly long messages
        if (message.length > MAX_MESSAGE_LENGTH) {
            console.log('Blocked an excessively long message.');
            return;
        }

        // Reject messages with disallowed characters
        if (!ALLOWED_PATTERN.test(message)) {
            console.log('Blocked a message with disallowed characters.');
            return;
        }

        // Broadcast the validated message
        io.emit('chat message', { username, message });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected.');
    });
});

// Start the server
const PORT = 30000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
