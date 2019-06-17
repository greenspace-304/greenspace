var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'data123!#',
    database: 'greenspace'
  })

  connection.connect()

  connection.query('SELECT * from users', function (err, rows, fields) {
    if (err) throw err
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(rows));
  })

  connection.end()

});

module.exports = router;
