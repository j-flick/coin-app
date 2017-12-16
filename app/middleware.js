//Dependencies
var session = require("express-session"),
var bodyParser = require("body-parser");

//Require models for synching
var dbUser= require(".models/user.js");

//Set up express app midleware to handle data parsing.
app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

//Static directory
app.use(express.static("public"));

//Routes
require("./route/passport-routes.js")(app);


//Sync passport models for sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});