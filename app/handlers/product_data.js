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

  var startIndexStr = req.query.startIndex;
  var limitStr = req.query.limit;
  var projectCode = req.query.projectCode;
  var priceFromStr = req.query.priceFrom;
  var priceToStr = req.query.priceTo;
  var roomsCountStr = req.query.roomsCount;

  var priceFrom = parseInt(priceFromStr);;
  var priceTo = parseInt(priceToStr);
  var roomsCount = parseInt(roomsCountStr);;

  var startIndex = parseInt(startIndexStr);
  var limit = parseInt(limitStr);

  if(roomsCount != 99){
    var query = "SELECT * FROM unit WHERE price >= ? AND price <= ? and rooms = ? LIMIT ?,? ";

    db.query(
      query, [priceFrom, priceTo, roomsCount, startIndex, limit],
      function(err, rows) {
        if (err) throw err;
        res.json(rows);
      }
    );
  }else{
    var query = "SELECT * FROM unit WHERE price >= ? AND price <= ? LIMIT ?,? ";

    db.query(
      query, [priceFrom, priceTo, startIndex, limit],
      function(err, rows) {
        if (err) throw err;
        res.json(rows);
      }
    );
  }
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
