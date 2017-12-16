//$ npm install passport-local//

var passport = require('passport'), 
   ,LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User_List.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Invalid Login Attempt.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Invalid Login Attempt ' });
      }
      return done(null, user);
    });
  }
));
