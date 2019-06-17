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

  connection.query(`SELECT * from userphotos`, function (err, rows, fields) {
    if (err) throw err
    res.send(JSON.stringify(rows));
  })
  connection.end()

});

router.get('/:id', function(req, res, next) {
  let plantId = req.params.id;
  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'data123!#',
    database: 'greenspace'
  })

  connection.connect()

  connection.query(`SELECT * from userphotos where plantid=${plandId}`, function (err, rows, fields) {
    if (err) throw err
    res.send(JSON.stringify(rows));
  })
  connection.end()

});

module.exports = router;
