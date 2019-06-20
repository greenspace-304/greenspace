var express = require('express');
var dbCreds = require('./shared/credentials')
var router = express.Router();

/* POST a plant into a users collection*/
router.post('/add_plant', function(req, res, next){

  let addPlantToCollection = `insert into collect set?`;
  let addPlantParams = {userId: req.body.userId,
                        cName: req.body.cName,
                        plantId: req.body.plantId}

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })
  connection.connect()
  connection.query(addPlantToCollection, addPlantParams, function (err, rows, fields) {
    if (err) {
      console.log(err)
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(Json.stringify(req.body))
    }
  })
})


/* POST delete plant from users collection*/
router.post('/remove_plant', function(req, res, next){
  let deletePlant = `delete from collect
                      where cname=?, userid=?, plantid=?`
  let deletePlantParams = {userId: req.body.userId,
                          cName: req.body.cName,
                          plantId: req.body.plantId}

  var mysql = require('mysql')
  var connection = mysql.createConnection({
   host: 'localhost',
   user: dbCreds.dbUsername,
   password: dbCreds.dbPassword,
   database: 'greenspace'
  })
  connection.connect()
  connection.query(deletePlant, deletePlantParams, function (err, rows, fields) {
    if (err) {
      throw err
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(Json.stringify(req.body))
    }
  })
})

router.post('/remove_collection', function(req, res, next){
  let deleteCollection = `delete from collections
                      where cname=?, userid=?`
  let deleteCollectionParams = {userId: req.body.userId,
                          cName: req.body.cName}

  var mysql = require('mysql')
  var connection = mysql.createConnection({
   host: 'localhost',
   user: dbCreds.dbUsername,
   password: dbCreds.dbPassword,
   database: 'greenspace'
  })
  connection.connect()
  connection.query(deleteCollection, deleteCollectionParams, function (err, rows, fields) {
    if (err) {
      throw err
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(Json.stringify(req.body))
    }
  })
})


router.get('/:userId', function(req, res, next){
  let selectCollection = `select cName from collections where userid=${req.params.userId}`;

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()
  connection.query(selectCollection, function (err, rows, fields) {
    if (err){
      console.log(err);
    } else {
      console.log(rows);
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(JSON.stringify(rows));
    }
  })
  connection.end()
})

router.post('/get_plant', function(req, res, next){
  let selectPlant = `select plantid from collect?`
  let selectPlantParams = {userId: req.body.userId, cname: req.body.cName};

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()
  connection.query(selectPlant, selectPlantParams, function (err, rows, fields) {
    if (err) {
      console.log(err)
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(JSON.stringify(rows));
    }
  })
  connection.end()
})

router.post('/add', function(req, res, next){
  let createCollection = `insert into collections set?`
  let insertParams = {userid: req.body.userId, cname:req.body.cName}

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()

  connection.query(createCollection, insertParams ,function (err, rows, fields) {
    if (err){
      console.log(err);
    }
    else {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(JSON.stringify(rows));
    }
  })
  connection.end()
})

module.exports = router;
