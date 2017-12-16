// **********************************************************************
// api-routes.js - set of routes for displaying and saving data to the db
// **********************************************************************

// Dependencies
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

// Routes

app.post('/login', passport.authenticate('local', { 
  		successRedirect: '/dashboard',
  		failureRedirect: '/login',
  		failureFlash: 'Invalid Login Attempt',
                         });
);

app.get('/', passport.authenticate ('basic', {session: true}),
	function (req, res) {
		res.json({ id: req.user.id, usrename:req.user.username });
	});



//req.get("/api/secret", authMiddleware, function(req,res) {})
//function authMiddleware (req,res,next){
	//check JWT token
	//lookup sessions
	//etc.
	//next();
	//err=403 forbidden
}