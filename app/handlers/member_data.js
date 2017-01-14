var moment = require('moment');

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

    var query = "SELECT m.*, (SELECT COUNT(1) FROM member_customer WHERE member_customer.member_id = m.id) as customers_count FROM member m WHERE m.first_name LIKE ? ORDER BY m.first_name LIMIT ?,? ";

    db.query(
      query, [nameLike, startIndex, limit],
      function(err, rows) {
        if (err) throw err;
        res.json(rows);
      }
    );
  }else{
    var query = "SELECT m.*, (SELECT COUNT(1) FROM member_customer WHERE member_customer.member_id = m.id) as customers_count FROM member m WHERE m.first_name LIKE ? ORDER BY m.first_name ";

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

  var tmpMember = req.body;
  var tmpPath = req.file;

  tmpMember.avatarFileName = req.file.filename;
  tmpMember.avatarFileInformation = JSON.stringify(req.file);

  var birthDate = moment(tmpMember.birthDate, "DD/MM/YYYY");

  var member = {
    first_name: tmpMember.firstName,
    last_name: tmpMember.lastName,
    registration_number: tmpMember.registrationNumber,
    address: tmpMember.address,
    city_id: tmpMember.cityId,
    birth_date: birthDate.toDate(),
    username: tmpMember.username,
    password: tmpMember.password,
    member_group_id: tmpMember.memberGroupId,
    account_name: tmpMember.accountName,
    bank_name: tmpMember.bankName,
    account_number: tmpMember.accountNumber,
    email: tmpMember.email,
    mobile1: tmpMember.mobile1,
    mobile2: tmpMember.mobile2,
    avatar_file_name: tmpMember.avatarFileName,
    avatar_file_information: tmpMember.avatarFileInformation
  };

  db.query('INSERT INTO member SET ?', member, function(err, result){
    if(err){
      console.log(err);
      res.status(400).send('Error while doing operation.');
    }else{
      res.json({status: 'INSERT_SUCCESS', lastId: result.insertId});
    }
  });

};

exports.customerList = function(req, res, db) {

  var startIndexStr = req.query.startIndex;
  var limitStr = req.query.limit;
  var username = req.user.username;
  var nameLike = req.query.nameLike;

  if(nameLike == undefined){
    nameLike = "%%"
  }else{
    nameLike = "%" + nameLike + "%"
  }

  var startIndex = parseInt(startIndexStr);
  var limit = parseInt(limitStr);

  var query = "SELECT * FROM member WHERE username = ? ";

  db.query(
    query, [username],
    function(err, rows) {
      if (err) throw err;

       var row = rows[0];
       var memberId = row['id'];

       var query = "SELECT cu.*, c.id AS city_id, c.code AS city_code, c.name AS city_name FROM customer cu " +
                //  "LEFT JOIN member_customer mc ON mc.customer_id = c.id " +
                 "LEFT JOIN city c ON cu.city_id = c.id " +
                 "WHERE cu.member_id = ? and cu.first_name like ? " +
                 "" +
                 "LIMIT ?,? ";

       db.query(
         query, [memberId, nameLike, startIndex, limit],
         function(err, rows) {
           if (err) throw err;
           res.json(rows);
         }
       );
    }
  );
};

exports.getByUsername = function(req, res, db) {

  var username = req.user.username;

  var query = "SELECT * FROM member WHERE username = ? ";

  db.query(
    query, [username],
    function(err, rows) {
      if (err) throw err;
      if (rows.length > 0){
          var row = rows[0];
          res.json(row);
      }
    }
  );
};

exports.cityList = function(req, res, db) {

  var query = "SELECT * FROM city ";

  db.query(
    query, [],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );
};

exports.memberGroupList = function(req, res, db) {

  var query = "SELECT * FROM member_group ";

  db.query(
    query, [],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );
};

exports.changePassword = function(req, res, db) {

  var username = req.user.username;

  db.query(
  'UPDATE member SET password = ? ' +
  'WHERE username = ?',
  [
    req.body.newPassword,
    username
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
