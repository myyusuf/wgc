exports.list = function(req, res, db) {

  var query = "SELECT * FROM tb_siswa  ";

  db.query(
    query, [],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );

};
