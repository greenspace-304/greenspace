var express = require('express');
var dbCreds = require('./shared/credentials');
var router = express.Router();


/* GET all userphotos */
router.get('/userphotos', function(req, res, next) {
  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()
  connection.query(`SELECT caption, photopath from userphotos`, function (err, rows, fields) {
    if (err) throw err

    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(rows));
  })
  connection.end()
});

/* GET all userphotos from a specific plantID */
router.get('/userphotos/:id', function(req, res, next) {
  let plantId = req.params.id;
  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()

  connection.query(`SELECT caption, photopath from userphotos where plantid=${plandId}`, function (err, rows, fields) {
    if (err) throw err

    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(rows));
  })
  connection.end()

});


router.get('/:userid', function(req, res, next) {
  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()
  connection.query(`SELECT * from userphotos where userid=${req.params.userid}`, function (err, rows, fields) {
    if (err) throw err
    res.send(JSON.stringify(rows));
  })
  connection.end()

});


router.post('/defaultphotos', function(req, res, next){
  let getDefaultPhotos = `select * from defaultphotos where plantid in ${req.body.plantids}`

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()

  connection.query(getDefaultPhotos, function (err, rows, fields) {
    if (err) throw err
    res.send(JSON.stringify(rows));
  })
  connection.end()
})



module.exports = router;
