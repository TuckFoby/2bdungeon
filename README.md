Description
This project is a web-based companion app for Fallout TTRPG; the website allows players to create accounts for themselves so they can store user-specific information related to their in-game characters (SPECIAL stats, Skills, perks, inventory, equipped gear). Of course, the design theme is based on the legendary post-apocalyptic game series. 

As is, the website is meant to be used by a single group of players at a time due to a lack of server rooms within the chat box (where everyone's rolls are publically displayed, therefore multiple games running at the same time would be very chaotic). 

The project is composed of .EJS pages, a Node.js server, passport for user authentication, Bcrypt for password hashing, CSURF for protection against cross-site attacks, Express-Validator for santization


Getting Started

1. clone/download the repo
2. install dependencies using npm install
3. setup your environment variables in .env
4. run the server use node
