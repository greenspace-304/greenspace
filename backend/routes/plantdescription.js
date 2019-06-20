var express = require('express');
var dbCreds = require('./shared/credentials');
var router = express.Router();


/* GET info neeeded for plant description page */
router.post('/', function(req, res, next) {
  let plantId = req.body.plantId;
  let userId = req.body.userId;

  let plantQuery = `SELECT * from plants where plantID=${plantId}`;
  let photoQuery = `select photopath, caption from userphotos where plantid=${plantId}`
  let collectionQuery = `select * from collections where userid=${userId}`;
  let markerQuery = `select * from markers where plantid=${plantId}`;
  let regionQuery = `select distinct maps.x_coordinate, maps.y_coordinate from
                      markers, markedby, maps
                      where markers.markerid = markedby.markerid and
                            markedby.mapid = maps.mapid and markers.plantid = ${plantId}`

  let responseBody = {
      "plants": [],
      "photos": [],
      "collection": [],
      "markers": [],
      "region": []
  }

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })
  connection.connect()

  let plantPromise = new Promise(function(resolve, reject){
    connection.query(plantQuery, function (err, rows, fields) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    })
  })

  let photoPromise = new Promise(function(resolve, reject){
    connection.query(photoQuery, function (err, rows, fields) {
      if (err) {
        return reject(err)
      }
      resolve(rows);
    })
  })

  let collectionPromise = new Promise(function(resolve, reject){
    connection.query(collectionQuery, function (err, rows, fields) {
      if (err) {
        return reject(err)
      }
      resolve(rows);
    })
  })

  let markerPromise = new Promise(function(resolve, reject){
    connection.query(markerQuery, function (err, rows, fields) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    })
  })

  let regionPromise = new Promise(function(resolve, reject){
    connection.query(regionQuery, function (err, rows, fields) {
      if (err) {
        return reject(err)
      }
      resolve(rows)
    })
  })

  plantPromise.then(function(result){
    responseBody.plants = result;
  }, function(err){
    console.log(err);
  })

  photoPromise.then(function(result){
    responseBody.photos = result;
  }, function(err){
    console.log(err);
  })

  collectionPromise.then(function(result){
    responseBody.collection = result;
  }, function(err){
    console.log(err);
  })

  markerPromise.then(function(result){
    responseBody.markers = result;
  }, function(err){
    console.log(err);
  })

  regionPromise.then(function(result){
    responseBody.region = result;
  }, function(err){
    console.log(err);
  })

  Promise.all([plantPromise, photoPromise, collectionPromise, collectionPromise, markerPromise, regionPromise])
    .then(() => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(JSON.stringify(responseBody));
    })
    .catch((err) => {
      console.log(err);
    })
  connection.end()
});


router.post('/update_plant', function(req, res, next){
  let request = req.body;

  let updateQuery= `update plants set
                  CommonName=?, scientificName=?, description=?, category=?,
                  growthType=?, barkTexture=?, barkColor=?, barkThickness=?,
                  flowerColor=?, petalNumber=?, leafColor=?, leafShape=?,
                  leafArrangement=?, hasThorns=?, fruitType=?,
                  fruitColor=?, fruitShape=?, floweringSeason=?
                  where plantid=?`

  let updateParams =
  [request.commonName, request.scientificName, request.description, request.category,
    request.growthType, request.barkTexture, request.barkColor, request.barkThickness,
    request.flowerColor, request.petalNumber, request.leafColor, request.leafShape,
    request.leafArrangement, request.hasThorns, request.fruitType, request.fruitColor,
    request.fruitShape, request.floweringSeason, request.plantId]

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()

  connection.query(updateQuery, updateParams, function (err, rows, fields) {
    if (err) throw err
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(rows));
  })
  connection.end()

})


module.exports = router;
