var express = require('express');
var router = express.Router();


/* GET specific plant */
router.post('/', function(req, res, next) {
  let plantId = req.body.plantId;
  let userId = req.body.userId;

  let plantQuery = `SELECT * from plants where plantID=${plantId}`;
  let photoQuery = `select photopath from userphotos where plantid=${plantid}`
  let collectionQuery = `select * from collections where userid=${userId}`;
  let markerQuery = `select * from markers where plantid=${plantid}`;
  let regionQuery = `select distinct region from
                      markers, markedby, maps
                      where markers.markerid = markedby.markerid and
                            markedby.mapid = maps.mapid and markers.plantid = ${plantid}`

  let plantResult =[];
  let photoResult = [];
  let collectionResult = [];
  let markerResutlt= [];
  let regionResult = [];

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'data123!#',
    database: 'greenspace'
  })
  connection.connect()
  connection.query(plantQuery, function (err, rows, fields) {
    if (err) throw err
    plantResult = rows;
  })

  connection.query(photoQuery, function (err, rows, fields) {
    if (err) throw err
    photoResult = rows;
  })

  connection.query(collectionQuery, function (err, rows, fields) {
    if (err) throw err
    collectionResult = rows;
  })

  connection.query(markerQuery, function (err, rows, fields) {
    if (err) throw err
    markerResult = rows;
  })

  connection.query(regionQuery, function (err, rows, fields) {
    if (err) throw err
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


/* POST */

module.exports = router;
