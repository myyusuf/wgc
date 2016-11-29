var WGCConstant = require('../../config/wgc_constant.js');

var fs = require('fs-extra');
var path = require('path');

exports.list = function(req, res, db) {

  var query = "SELECT * FROM news ";

  db.query(
    query, [],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );

};

exports.viewImage = function (req, res) {

    // var _newsCode = req.params.newsCode;
    var _imageCode = req.params.imageCode;

    var _directory = WGCConstant.NEWS_DIRECTORY_PATH;
    var _fileName = _imageCode + '.png';
    // var _filePath = _directory + _productCode + '/images/' + _fileName;
    var _filePath = _directory + '/images/' + _fileName;

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
