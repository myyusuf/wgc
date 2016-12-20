// config/passport.js

// load all the things we need
// var LocalStrategy   = require('passport-local').Strategy;
var BasicStrategy   = require('passport-http').BasicStrategy;

// load up the user model
// var User       		= require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport, db) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        /*User.findById(id, function(err, user) {
            done(err, user);
        });*/
        var _user = {};

        var _query = "SELECT * FROM member WHERE username=? ";

        db.query(
          _query, [id],
          function(err, rows) {
            if (err) throw err;

            if (rows.length > 0) {
              var _row = rows[0];
              _user['id'] = _row.id;
              _user['username'] = _row.username;
              _user['password'] = _row.password;
              _user['firstName'] = _row.first_name;
              _user['email'] = _row.email;

              return done(null, _user);
            }else{
              return done(null, false);
            }
          }
        );

    });

    passport.use(new BasicStrategy(
      function(userid, password, done) {
        // User.findOne({ username: userid }, function (err, user) {
        //   if (err) { return done(err); }
        //   if (!user) { return done(null, false); }
        //   if (!user.verifyPassword(password)) { return done(null, false); }
        //   return done(null, user);
        // });
        // console.log('userid : ' + userid);
        // console.log('password : ' + password);

        var _user = {};

        var _query = "SELECT * FROM member WHERE username=? ";

        db.query(
          _query, [userid],
          function(err, rows) {
            if (err) throw err;

            if (rows.length > 0) {
              var _row = rows[0];
              _user['id'] = _row.id;
              _user['username'] = _row.username;
              _user['password'] = _row.password;
              _user['firstName'] = _row.first_name;
              _user['email'] = _row.email;

              if(password == _row.password){
                return done(null, _user);
              }else{
                return done(null, false);
              }
            }else{
              return done(null, false);
            }
          }
        );
      }
    ));

};
