// **********************************************************************
// server.js - starting point for the node/express server.
// **********************************************************************

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const user = require('./models/user.js');
const mysql = require('mysql');
const mysql2 = require('mysql2');
const bcrypt = require('bcrypt');

// Setup express app
const app = express();
app.set('port', 3000);

// Require models for syncing.
var db = require("./models/portfolio.js");

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// Setup express app to handle data parsing.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// Static directory
app.use(express.static("public"));

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};


// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});


// route for user signup
app.route('/register')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/register.html');
    })
    .post((req, res) => {
        console.log(req.body)
        user.create({
                username: req.body.exampleInputUsername,
                email: req.body.exampleInputEmail1,
                password: req.body.exampleInputPassword1
            })
            .then(user => {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            })
            .catch(error => {
                res.redirect('/register');
            });
    });


// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    });

    app.route('/api/login')
    .post((req, res) => {
        var username = req.body.exampleInputUsername,
            password = req.body.exampleInputPassword1;

        user.findOne({
            where: {
                username: username
            }
        }).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
        });
    });


// route for user's dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/dashboard.html');
    } else {
        res.redirect('/login');
    }
});

// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});


// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Sync sequelize models and start express app.
// db.sequelize.sync({ force: true }).then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });

// start the express server
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));
