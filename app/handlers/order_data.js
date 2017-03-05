exports.order = function(req, res, db) {
  var orderData = req.body;

  var customerId = parseInt(orderData.customerId);
  var description = orderData.description;

  var newOrder = {
    customer_id: customerId,
    description: description,
    status: 1,
    order_datetime: new Date()
  }

  db.query('INSERT INTO customer_order SET ?', newOrder, function(err, result){
    if(err){
      console.log(err);
      res.status(500).send('Error while doing operation.');
    }
    res.json({status: 'INSERT_SUCCESS', lastId: result.insertId});
  });
};

// exports.list = function(req, res, db) {
//
//   var query = "SELECT * FROM order ";
//
//   db.query(
//     query, [],
//     function(err, rows) {
//       if (err) throw err;
//       res.json(rows);
//     }
//   );
//
// };
