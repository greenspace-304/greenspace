var express = require('express');
var dbCreds = require('./shared/credentials')
var router = express.Router();

/* TOP 5 Most Added Plants in the past month */
router.get('/monthly_plant', function(req, res, next) {
  let query = `select p.CommonName as PlantName, count(c.userid) as TimesAdded
              from plants p, collect c, collections ct
              where p.plantid = c.plantid and c.cname = ct.cname and c.userid = ct.userid and c.addedtime > DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
              group by p.plantid, p.commonname, c.userid, ct.cname
              order by TimesAdded desc limit 5;`;

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
    `select dp.photopath, dp.caption from defaultphotos dp
    inner join
    (select p.plantid as PlantId, count(c.userid) as TimesAdded
    from plants p, collect c, collections ct, defaultphotos dp
    where p.plantid = c.plantid and c.cname = ct.cname and c.userid = ct.userid
    And c.addedtime > DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
    group by p.plantid, p.commonname, c.userid, ct.cname
    order by TimesAdded asc limit 1) as topPlants
    on dp.plantid = topPlants.plantid;
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
  `SELECT p.CommonName FROM collect as c1
    join plants p on p.plantid = c1.plantId
      WHERE NOT EXISTS (
      SELECT userid as UserId FROM collections as ct
      where not exists
      (SELECT userid as UserId FROM  collect as c2 WHERE c1.cname = c2.cname and c1.userid = c2.userid ) )
      Group by c1.plantid;`;

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
    `select plants.CommonName from plants
    inner join(
    select p.plantid as PlantId, count(c.userid) as TimesAdded
    from plants p, collect c, collections ct
    where p.plantid = c.plantid and c.cname = ct.cname and c.userid = ct.userid
    group by p.plantid, c.userid, ct.cname
    order by TimesAdded) as PopularPlants
    where plants.plantid = PopularPlants.plantid
    group by plants.plantid, PopularPlants.TimesAdded
    having PopularPlants.TimesAdded = MAX(PopularPlants.TimesAdded)
    order by plants.plantid asc limit 1;`;

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
