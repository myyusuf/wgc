var WGCConstant = require('../../config/wgc_constant.js');

var fs = require('fs-extra');
var path = require('path');

exports.viewImage = function (req, res) {

    // var _projectCode = req.params.projectCode;
    // var _imageCode = req.params.imageCode;

    var _directory = WGCConstant.PROMOTION_DIRECTORY_PATH;
    // var _fileName = _imageCode + '.png';
    // var _filePath = _directory + _projectCode + '/' + _fileName;
    var _fileName = 'promotion_1' + '.png';
    var _filePath = _directory + '/' + _fileName;

    fs.readFile(_filePath, function (err, content) {
        if (err) {
            res.writeHead(400, {
                'Content-type': 'image/jpeg'
            })
            console.log(err);
            res.end("No file found.");
        } else {
            res.end(content);
        }
    });

};
