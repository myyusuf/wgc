exports.list = function(req, res, db) {

  var query = "SELECT * FROM unit ";

  db.query(
    query, [],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );

};

exports.unitOrder = function(req, res, db) {

  var orderData = req.body;

  var selectedUnitsArr = orderData.selectedUnits.split(",");
  selectedUnitsArr.map(function (val) {

    var intVal = parseInt(val);
    if(!isNaN(intVal)){
      console.log("selected unit : " + intVal);
      console.log("selected customer : " + orderData.selectedCustomer);

      var customerUnit = {
        customer_id: parseInt(orderData.selectedCustomer),
        unit_id: intVal,
        status: 1,
        progress: 0,
        order_datetime: new Date()
      };

      db.query('INSERT INTO customer_unit SET ?', customerUnit, function(err, result){
        if(err){
          console.log(err);
          res.status(500).send('Error while doing operation.');
        }
      });
    }
  });

  res.json({status: 'INSERT_SUCCESS', lastId: 0});

};
