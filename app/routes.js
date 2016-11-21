var WGCConstant = require('../config/wgc_constant.js');

var memberData = require('./handlers/member_data.js');
var customerData = require('./handlers/customer_data.js');
var promotionData = require('./handlers/promotion_data.js');

var multer  = require('multer')
var upload = multer({ dest: WGCConstant.AVATAR_DIRECTORY_PATH })

module.exports = function(app, passport, db) {

  app.get('/', function(req, res) {
    res.json({result: 'OK'});
  });

  app.get('/members', function(req, res) {
    memberData.list(req, res, db);
  });

  app.get('/customers', function(req, res) {
    customerData.list(req, res, db);
  });
  app.post('/customers', function(req, res) {
    customerData.add(req, res, db);
  });

  app.get('/promotion', function(req, res) {
    promotionData.viewImage(req, res, db);
  });

  // app.post('/customers_upload', function(req, res) {
  //   customerData.upload(req, res, db);
  // });

  app.post('/customers_upload', upload.single('photo'), function (req, res, next) {
    customerData.upload(req, res, db);
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
