var express = require('express');
var dbCreds = require('./shared/credentials');
var router = express.Router();


/* GET info neeeded for plant description page */
router.post('/', function(req, res, next) {
  let plantId = req.body.plantId;
  let userId = req.body.userId;

  let plantQuery = `SELECT * from plants where plantID=${plantId}`;
  let photoQuery = `select photopath from userphotos where plantid=${plantId}`
  let collectionQuery = `select * from collections where userid=${userId}`;
  let markerQuery = `select * from markers where plantid=${plantId}`;
  let regionQuery = `select distinct region from
                      markers, markedby, maps
                      where markers.markerid = markedby.markerid and
                            markedby.mapid = maps.mapid and markers.plantid = ${plantId}`

  let plantResult =[];
  let photoResult = [];
  let collectionResult = [];
  let markerResult= [];
  let regionResult = [];

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })
  connection.connect()
  connection.query(plantQuery, function (err, rows, fields) {
    if (err) throw err
    console.log(rows);
    plantResult = rows;
  })

  connection.query(photoQuery, function (err, rows, fields) {
    if (err) throw err
    console.log(rows);
    photoResult = rows;
  })

  connection.query(collectionQuery, function (err, rows, fields) {
    if (err) throw err
    console.log(rows)
    collectionResult = rows;
  })

  connection.query(markerQuery, function (err, rows, fields) {
    if (err) throw err
    console.log(rows)
    markerResult = rows;
  })

  connection.query(regionQuery, function (err, rows, fields) {
    if (err) throw err
    console.log(rows)
    regionResult = rows;
  })

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.send(JSON.stringify({
    "plants": plantResult,
    "photos": photoResult,
    "collection": collectionResult,
    "markers": markerResult,
    "region": regionResult
  }));

  connection.end()
});


router.post('/update_plant', function(req, res, next){

})


module.exports = router;
