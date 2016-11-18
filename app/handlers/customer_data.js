exports.list = function(req, res, db) {

  var startIndexStr = req.query.startIndex;
  var limitStr = req.query.limit;
  var nameLike = req.query.nameLike;

  if(nameLike == undefined){
    nameLike = "%%"
  }else{
    nameLike = "%" + nameLike + "%"
  }

  if((startIndexStr != undefined && startIndexStr != '') && (limitStr != undefined && limitStr != '')){

    var startIndex = parseInt(startIndexStr);
    var limit = parseInt(limitStr);

    var query = "SELECT * FROM customer WHERE first_name LIKE ? ORDER BY first_name LIMIT ?,? ";

    db.query(
      query, [nameLike, startIndex, limit],
      function(err, rows) {
        if (err) throw err;
        res.json(rows);
      }
    );
  }else{
    var query = "SELECT * FROM customer WHERE first_name LIKE ? ORDER BY first_name ";

    db.query(
      query, [nameLike],
      function(err, rows) {
        if (err) throw err;
        res.json(rows);
      }
    );
  }
};

exports.upload = function(req, res, db) {

  var tmpCustomer = req.body;
  var tmpPath = req.file;

  tmpCustomer.avatarFileName = req.file.filename;
  tmpCustomer.avatarFileInformation = JSON.stringify(req.file);
  // var keys = Object.keys(customer);
  // console.log(keys);
  // console.log("customer.avatarFileName : " + customer.avatarFileName);
  // keys = Object.keys(req.file);
  // console.log(JSON.stringify(req.file));

  var customer = {
    first_name: tmpCustomer.firstName,
    last_name: tmpCustomer.lastName,
    id_number: tmpCustomer.idNumber,
    address: tmpCustomer.address,
    email: tmpCustomer.email,
    mobile: tmpCustomer.mobile,
    landline: tmpCustomer.landline,
    avatar_file_name: tmpCustomer.avatarFileName,
    avatar_file_information: tmpCustomer.avatarFileInformation
  };

  db.query('INSERT INTO customer SET ?', customer, function(err, result){
    if(err){
      console.log(err);
      res.status(500).send('Error while doing operation.');
    }else{
      res.json({status: 'INSERT_SUCCESS', lastId: result.insertId});
    }

  });

};

// var fs = require('fs-extra');
// var wgconstant = require('../../config/wgconstant.js');
//
// var path = require('path');
//
// exports.viewImage = function (req, res) {
//
//     var _projectCode = req.params.projectCode;
//     var _imageCode = req.params.imageCode;
//
//
//     var _directory = wgconstant.PROJECT_IMAGE_DIRECTORY_PATH;
//     var _fileName = _imageCode + '.png';
//     var _filePath = _directory + _projectCode + '/' + _fileName;
//
//     fs.readFile(_filePath, function (err, content) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-type': 'image/jpeg'
//             })
//             console.log(err);
//             res.end("No file found.");
//         } else {
//             res.end(content);
//         }
//     });
//
// };
