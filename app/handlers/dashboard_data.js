exports.view = function(req, res, db) {

  var username = req.user.username;

  res.json({
    total_fee: 2000000,
    redeem_fee: 1000000,
    total_orders: 15,
    closing_orders: 5,
    active_orders: 12,
    expired_orders: 3,
    fee_points: [
      {
        period: 'Jan - March',
        point: 200
      },
      {
        period: 'Apr - May',
        point: 160
      },
    ]
  });

  // var query = "SELECT * FROM member WHERE username = ? ";
  //
  // db.query(
  //   query, [username],
  //   function(err, rows) {
  //     if (err) throw err;
  //     if (rows.length > 0){
  //         var row = rows[0];
  //         res.json(row);
  //     }
  //   }
  // );
};
