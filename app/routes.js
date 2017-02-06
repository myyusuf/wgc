var WGCConstant = require('../config/wgc_constant.js');

var memberData = require('./handlers/member_data.js');
var customerData = require('./handlers/customer_data.js');
var promotionData = require('./handlers/promotion_data.js');
var productData = require('./handlers/product_data.js');
var unitData = require('./handlers/unit_data.js');
var newsData = require('./handlers/news_data.js');

var multer  = require('multer')
var upload = multer({ dest: WGCConstant.AVATAR_DIRECTORY_PATH })

module.exports = function(app, passport, db) {

  app.get('/', function(req, res) {
    res.json({result: 'OK'});
  });

  app.get('/mobilelogin', passport.authenticate('basic', { session: false }),function(req, res) {
    memberData.getByUsername(req, res, db);
  });

  app.get('/members', function(req, res) {
    memberData.list(req, res, db);
  });
  app.post('/members_upload', upload.single('photo'), function (req, res, next) {
    memberData.upload(req, res, db);
  });
  app.get('/members/details/customers', passport.authenticate('basic', { session: false }), function(req, res) {
    memberData.customerList(req, res, db);
  });
  app.put('/members_cpsw', passport.authenticate('basic', { session: false }), function(req, res) {
    memberData.changePassword(req, res, db);
  });

  app.get('/cities', function(req, res) {
    memberData.cityList(req, res, db);
  });

  app.get('/membergroups', function(req, res) {
    memberData.memberGroupList(req, res, db);
  });

  app.get('/customers', function(req, res) {
    customerData.list(req, res, db);
  });
  app.post('/customers', passport.authenticate('basic', { session: false }), function(req, res) {
    customerData.add(req, res, db);
  });
  app.put('/customers/:customerId', passport.authenticate('basic', { session: false }), function(req, res) {
    customerData.update(req, res, db);
  });
  app.get('/customers/:customerId/images/avatar/temp', function(req, res) {
    customerData.viewAvatar(req, res, db);
  });

  app.get('/customers/:customerId/units', function(req, res) {
    customerData.unitList(req, res, db);
  });

  app.get('/promotion', function(req, res) {
    promotionData.viewImage(req, res, db);
  });

  app.get('/products', function(req, res) {
    productData.list(req, res, db);
  });

  app.get('/products/:productCode/images/:imageCode/temp', function(req, res) {
    productData.viewImage(req, res, db);
  });

  app.get('/products/:productCode/units', function(req, res) {
    productData.unitList(req, res, db);
  });

  app.get('/products/:productCode/benefits', function(req, res) {
    productData.benefitList(req, res, db);
  });

  // app.post('/customers_upload', function(req, res) {
  //   customerData.upload(req, res, db);
  // });

  app.get('/units', function(req, res) {
    unitData.list(req, res, db);
  });
  app.post('/unit_order', passport.authenticate('basic', { session: false }), function (req, res, next) {
    unitData.unitOrder(req, res, db);
  });

  app.post('/customers_upload', passport.authenticate('basic', { session: false }), upload.single('photo'), function (req, res, next) {
    customerData.upload(req, res, db);
  });

  app.get('/news', function(req, res) {
    newsData.list(req, res, db);
  });
  app.get('/news/images/:imageCode/temp', function(req, res) {
    newsData.viewImage(req, res, db);
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
