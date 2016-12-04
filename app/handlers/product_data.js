var WGCConstant = require('../../config/wgc_constant.js');

var fs = require('fs-extra');
var path = require('path');

exports.list = function(req, res, db) {

  var query = "SELECT * FROM product ";

  db.query(
    query, [],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );

};

exports.unitList = function(req, res, db) {

  var productCode = req.params.productCode;


  var query = "SELECT u.*, p.code as project_code FROM unit u LEFT JOIN product p on u.product_id = p.id WHERE p.code = ? ";

  db.query(
    query, [productCode],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );
};

exports.viewImage = function (req, res) {

    var _productCode = req.params.productCode;
    var _imageCode = req.params.imageCode;

    var _directory = WGCConstant.PRODUCT_DIRECTORY_PATH;
    var _fileName = _imageCode + '.png';
    var _filePath = _directory + _productCode + '/images/' + _fileName;

    fs.readFile(_filePath, function (err, content) {
        if (err) {
            res.writeHead(400, {
                'Content-type': 'image/png'
            })
            console.log(err);
            res.end("No file found.");
        } else {
            res.end(content);
        }
    });

};
