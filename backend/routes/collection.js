var express = require('express');
var router = express.Router();

/* POST a plant into a users collection*/
router.post('/add_plant', function(req, res, next){

  let addPlantToCollection = `insert into collect(userid, cname, plantid)
                                values(${req.body.userid}, ${req.body.cname}, ${req.body.plantid})`;

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'data123!#',
    database: 'greenspace'
  })
  connection.connect()
  connection.query(addPlantToCollection, function (err, rows, fields) {
    if (err) throw err

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(Json.stringify(req.body))
  })
})


/* POST delete plant from users collection*/
router.post('/remove_plant', function(req, res, next){
  let deletePlant = `delete from collect
                      where cname=${req.body.cname}, userid=${req.body.userid}, plantid=${req.body.plantid}`

  var mysql = require('mysql')
  var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'data123!#',
   database: 'greenspace'
  })
  connection.connect()
  connection.query(addPlantToCollection, function (err, rows, fields) {
    if (err) throw err

    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(Json.stringify(req.body))
  })
})

/* GET users listing. */
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

  connection.query(`SELECT * from defaultphotos where plantID=${plantId}`, function (err, rows, fields) {
    if (err) throw err

    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(rows));
  })
  connection.end()

});

router.get('/:username', function(req, res, next){
  let selectCollection = `select * from collections where username=${req.params.username}`;

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'data123!#',
    database: 'greenspace'
  })

  connection.connect()

  connection.query(selectCollection, function (err, rows, fields) {
    if (err) throw err

    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(rows));
  })
  connection.end()
})

router.post('/get_plant', function(req, res, next){
  let selectPlant = `select plantid from collect where username=${req.body.username} and cname=${req.body.cname}`

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'data123!#',
    database: 'greenspace'
  })

  connection.connect()

  connection.query(selectPlant, function (err, rows, fields) {
    if (err) throw err

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(rows));
  })
  connection.end()

})

router.post('/add', functions(req, res, next){
  let createCollection = `insert into collections(userid, cname)
                          values(${req.params.userid}, ${req.params.cname})`

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'data123!#',
    database: 'greenspace'
  })

  connection.connect()

  connection.query(createCollection, function (err, rows, fields) {
    if (err) throw err

    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(rows));
  })
  connection.end()
})

module.exports = router;
