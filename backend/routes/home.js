var express = require('express');
var dbCreds = require('./shared/credentials')
var router = express.Router();

/* TOP 5 Most Added Plants in the past month */
router.get('/monthly_plant', function(req, res, next) {
  let query = `SELECT p.PlantID, p.CommonName AS PlantName, COUNT(c.UserID) AS TimesAdded
              FROM Plants p, Collect c, Collections ct
              WHERE p.PlantID = c.PlantID
              AND c.cname = ct.cname
              AND c.UserID = ct.UserID
              AND c.addedtime > DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
              AND c.addedtime < CURDATE()
              GROUP BY p.PlantID
              ORDER BY TimesAdded desc limit 5`;

  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()
  connection.query(query, function (err, rows, fields) {
    if (err){
      console.log(err)
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(JSON.stringify(rows));
    }
  })
  connection.end()
});

router.get('/monthly_photo', function(req, res, next) {
  let query =
    `SELECT dp.PhotoPath as PhotoPath, dp.Caption as Caption
    FROM DefaultPhotos dp
    INNER JOIN
	(SELECT p.PlantID AS PlantId, COUNT(c.UserID) AS TimesAdded
 	FROM Plants p, Collect c, Collections ct, DefaultPhotos dp
 	WHERE p.PlantId = c.PlantId and c.cname = ct.cname
 	AND c.UserID = ct.UserID
 	AND c.AddedTime > DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
 	AND c.AddedTime < CURDATE()
 	AND c.AddedTime < CURDATE()
 	GROUP BY p.PlantId
 	ORDER BY TimesAdded desc limit 1) AS TopPlants
ON dp.PlantId = TopPlants.PlantId;

    `;

  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()
  connection.query(query, function (err, rows, fields) {
    if (err){
      console.log(err)
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(JSON.stringify(rows));
    }
  })
  connection.end()
});

router.get('/recent_photos', function(req, res, next) {
  let query = `select photopath from userphotos u, photoupload up
                where u.photoname = up.photoname
                order by up.uploadtime desc limit 10;`;

  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()
  connection.query(query, function (err, rows, fields) {
    if (err){
      console.log(err)
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(JSON.stringify(rows));
    }
  })
  connection.end()
});

router.get('/most_collected', function(req, res, next) {
  let query =
  `SELECT p.CommonName, p.plantid
FROM Plants p
WHERE NOT EXISTS
    (SELECT *
     FROM Collections s
     WHERE NOT EXISTS
   	 (SELECT c.UserID
   	  FROM Collect c
   	  WHERE p.PlantID = c.PlantID
   	  AND s.UserID = c.UserID));`;

  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()
  connection.query(query, function (err, rows, fields) {
    if (err){
      console.log(err)
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(JSON.stringify(rows));
    }
  })
  connection.end()
});

router.get('/most_popular', function(req, res, next) {
  let query =
    `SELECT  Collect.PlantID, CommonName
    FROM Collect, Plants
    WHERE collect.plantid = Plants.plantid
    GROUP BY collect.PlantID
    ORDER BY COUNT(collect.PlantID)
    DESC LIMIT 1;`;

  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()
  connection.query(query, function (err, rows, fields) {
    if (err){
      console.log(err)
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(JSON.stringify(rows));
    }
  })
  connection.end()
});

module.exports = router;
