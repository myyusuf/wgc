exports.list = function(req, res, db) {

  var startIndexStr = req.query.startIndex;
  var limitStr = req.query.limit;

  if((startIndexStr != undefined && startIndexStr != '') && (limitStr != undefined && limitStr != '')){

    var startIndex = parseInt(startIndexStr);
    var limit = parseInt(limitStr);

    var query = "SELECT * FROM member ORDER BY first_name LIMIT ?,? ";

    db.query(
      query, [startIndex, limit],
      function(err, rows) {
        if (err) throw err;
        res.json(rows);
      }
    );
  }else{
    var query = "SELECT * FROM member ORDER BY first_name ";

    db.query(
      query, [],
      function(err, rows) {
        if (err) throw err;
        res.json(rows);
      }
    );
  }

};
