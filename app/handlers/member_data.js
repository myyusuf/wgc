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

exports.customerList = function(req, res, db) {

  var startIndexStr = req.query.startIndex;
  var limitStr = req.query.limit;
  var registrationNumber = req.params.registrationNumber + '';

  var startIndex = parseInt(startIndexStr);
  var limit = parseInt(limitStr);

  var query = "SELECT * FROM member WHERE registration_number = ? ";

  db.query(
    query, [registrationNumber],
    function(err, rows) {
      if (err) throw err;

      console.log(registrationNumber);
       var row = rows[0];
       var memberId = row['id'];

       var query = "SELECT c.* FROM customer c " +
                 "LEFT JOIN member_customer mc ON mc.customer_id = c.id " +
                 "WHERE mc.member_id = ? " +
                 "LIMIT ?,? ";

       db.query(
         query, [memberId, startIndex, limit],
         function(err, rows) {
           if (err) throw err;
           res.json(rows);
         }
       );
    }
  );

};
