var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Andrew_13',
    database: 'greenspace'
  })

  connection.connect()

  connection.query('SELECT * from ', function (err, rows, fields) {
    if (err) throw err

    res.send(JSON.stringify(rows));
  })

  connection.end()

});

module.exports = router;
