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

    var query = "SELECT * FROM customer WHERE first_name  LIKE ? ORDER BY first_name LIMIT ?,? ";

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
