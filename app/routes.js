
var memberData = require('./handlers/member_data.js');
var customerData = require('./handlers/customer_data.js');

module.exports = function(app, passport, db) {

  app.get('/', function(req, res) {
    res.json({result: 'OK'});
  });

  app.get('/members', function(req, res) {
    memberData.list(req, res, db);
  });

  app.get('/customers', function(req, res) {
    memberData.list(req, res, db);
  });

};

// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  // res.redirect('/');
  res.redirect('/login');
}
