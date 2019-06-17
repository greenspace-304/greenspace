var express = require('express');
var router = express.Router();


/* GET specific plant */
router.get('/:id', function(req, res, next) {
  let plantId = req.params.id
  let query = `SELECT * from plants where plantID=${plantId}`;
  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'data123!#',
    database: 'greenspace'
  })
  connection.connect()
  connection.query(query, function (err, rows, fields) {
    if (err) throw err
    res.send(JSON.stringify(rows));
  })
  connection.end()
});


/* POST */

module.exports = router;
