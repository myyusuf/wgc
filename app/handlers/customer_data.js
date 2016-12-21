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

  var memberId = req.user.id
  console.log("memberId : " + memberId);

  var customerId = tmpCustomer.customerId;

  if(customerId != undefined && customerId != null){
    var customer = {
      first_name: tmpCustomer.firstName,
      last_name: tmpCustomer.lastName,
      id_number: tmpCustomer.idNumber,
      address: tmpCustomer.address,
      email: tmpCustomer.email,
      mobile1: tmpCustomer.mobile1,
      mobile2: tmpCustomer.mobile2,
      avatar_file_name: tmpCustomer.avatarFileName,
      avatar_file_information: tmpCustomer.avatarFileInformation,
      action_type: tmpCustomer.actionType
    };

    db.query(
      'UPDATE customer SET first_name = ? ,'+
      'last_name = ? ,' +
      'id_number = ? ,' +
      'address = ? ,' +
      'email = ? ,' +
      'mobile1 = ? ,' +
      'mobile2 = ? ,' +
      'avatar_file_name = ? ,' +
      'avatar_file_information = ? ,' +
      'action_type = ? ' +
      'WHERE id = ?',
      [
        customer.first_name,
        customer.last_name,
        customer.id_number,
        customer.address,
        customer.email,
        customer.mobile1,
        customer.mobile2,
        customer.avatar_file_name,
        customer.avatar_file_information,
        customer.action_type,
        customerId
      ],
      function (err, result) {
        if(err){
          res.status(500).send('Error while doing operation.');
        }else{
          res.json({status: 'UPDATE_SUCCESS'});
        }
      }
    );
  }else{
    var customer = {
      member_id: memberId,
      first_name: tmpCustomer.firstName,
      last_name: tmpCustomer.lastName,
      id_number: tmpCustomer.idNumber,
      address: tmpCustomer.address,
      email: tmpCustomer.email,
      mobile1: tmpCustomer.mobile1,
      mobile2: tmpCustomer.mobile2,
      avatar_file_name: tmpCustomer.avatarFileName,
      avatar_file_information: tmpCustomer.avatarFileInformation,
      action_type: tmpCustomer.actionType
    };

    db.query('INSERT INTO customer SET ?', customer, function(err, result){
      if(err){
        console.log(err);
        res.status(500).send('Error while doing operation.');
      }else{
        res.json({status: 'INSERT_SUCCESS', lastId: result.insertId});
      }

    });
  }
};

exports.add = function(req, res, db) {

  var tmpCustomer = req.body;

  var memberId = req.user.id
  console.log("memberId : " + memberId);

  var customer = {
    member_id: memberId,
    first_name: tmpCustomer.firstName,
    last_name: tmpCustomer.lastName,
    id_number: tmpCustomer.idNumber,
    address: tmpCustomer.address,
    email: tmpCustomer.email,
    mobile1: tmpCustomer.mobile1,
    mobile2: tmpCustomer.mobile2,
    action_type: tmpCustomer.actionType
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

exports.update = function(req, res, db) {

  var customerId = req.params.customerId
  console.log('customerId : ' + customerId);


  var customer = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    id_number: req.body.idNumber,
    address: req.body.address,
    email: req.body.email,
    mobile1: req.body.mobile1,
    mobile2: req.body.mobile2,
    action_type: req.body.actionType
  };

  var keys = Object.keys(customer);
  console.log(keys);

  db.query(
  'UPDATE customer SET first_name = ? ,'+
  'last_name = ? ,' +
  'id_number = ? ,' +
  'address = ? ,' +
  'email = ? ,' +
  'mobile1 = ? ,' +
  'mobile2 = ? ,' +
  'action_type = ? ' +
  'WHERE id = ?',
  [
    customer.first_name,
    customer.last_name,
    customer.id_number,
    customer.address,
    customer.email,
    customer.mobile1,
    customer.mobile2,
    customer.action_type,
    customerId
  ],
  function (err, result) {
    if(err){
      console.log(err);
      res.status(500).send('Error while doing operation.');
    }else{
      res.json({status: 'UPDATE_SUCCESS'});
    }
  });
};

exports.unitList = function(req, res, db) {

  // var startIndexStr = req.query.startIndex;
  // var limitStr = req.query.limit;
  // var registrationNumber = req.params.registrationNumber;
  //
  // var startIndex = parseInt(startIndexStr);
  // var limit = parseInt(limitStr);
  //
  //
  // var query = "SELECT u.* FROM customer_unit cu " +
  //           "LEFT JOIN customer c ON ((cu.customer_id = c.id) AND (c.registration_number = ?)) " +
  //           "LEFT JOIN unit u ON cu.unit_id = u.id LIMIT ?,? ";
  //
  // db.query(
  //   query, [registrationNumber, startIndex, limit],
  //   function(err, rows) {
  //     if (err) throw err;
  //     res.json(rows);
  //   }
  // );

  var startIndexStr = req.query.startIndex;
  var limitStr = req.query.limit;
  var registrationNumber = req.params.registrationNumber + '';

  var startIndex = parseInt(startIndexStr);
  var limit = parseInt(limitStr);

  var query = "SELECT * FROM customer WHERE registration_number = ? ";

  db.query(
    query, [registrationNumber],
    function(err, rows) {
      if (err) throw err;

      console.log(registrationNumber);
       var row = rows[0];
       var customerId = row['id'];

       var query = "SELECT u.* FROM unit u " +
                 "LEFT JOIN customer_unit cu ON cu.unit_id = u.id " +
                 "WHERE cu.customer_id = ? " +
                 "LIMIT ?,? ";

       db.query(
         query, [customerId, startIndex, limit],
         function(err, rows) {
           if (err) throw err;
           res.json(rows);
         }
       );
    }
  );

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
