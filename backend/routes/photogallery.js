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
    if (err) {
      throw err
    } else {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(rows));
    }
  })
  connection.end()
});

/* GET all userphotos from a specific plantID */
router.get('/plantphotos/:id', function(req, res, next) {
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

/*GET all the userphotos*/
router.get('/userphotos/:userid', function(req, res, next) {
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
  let getDefaultPhotos = `select * from defaultphotos where plantid in (?)`

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()
  connection.query(getDefaultPhotos, req.body.plantIds ,function (err, rows, fields) {
    if (err) {
      console.log(err)
    } else {
      res.send(JSON.stringify(rows));
    }
  })
  connection.end()
})

/*CHECK WE NEED THIS*/
router.get('defaultplantphotos/:id', function(req, res, next) {
  let plantId = req.params.id;
  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
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

router.post('/remove_photo', function(req, res, next){
  let deletePhoto = `delete from userphotos
                      where photoid=?`;
  let deletePhotoParams = {photoid: req.body.photoId}

  var mysql = require('mysql')
  var connection = mysql.createConnection({
   host: 'localhost',
   user: dbCreds.dbUsername,
   password: dbCreds.dbPassword,
   database: 'greenspace'
  })
  connection.connect()
  connection.query(deletePhoto, deletePhotoParams, function (err, rows, fields) {
    if (err) {
      throw err
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(Json.stringify(req.body))
    }
  })
})



module.exports = router;
