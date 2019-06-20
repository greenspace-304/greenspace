var express = require('express');
var multer = require('multer');
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
});

const maxFileSize = 1024*1024*20;

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, './../frontend/greenspace-frontend/public');
  }
  ,
  filename: function (req, file, cb){
    console.log(req);
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    console.log("RIGHT FILE TYPE");
    cb(null, true);
  } else {
    console.log("SHOULDNT HAVE REACHED HERE")
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxFileSize
  },
  fileFilter: fileFilter
});

router.post('/upload_photo', upload.single('imageData'), function(req, res, next){
      console.log(req.body);
      console.log(req.file);

      var mysql = require('mysql')
      var connection = mysql.createConnection({
       host: 'localhost',
       user: dbCreds.dbUsername,
       password: dbCreds.dbPassword,
       database: 'greenspace'
      })
      connection.connect()

      let insertPhoto = `insert into userphotos set?`;
      let insertUserPhotoParams =
      {
        caption: req.body.caption,
        photoname: req.body.photoName,
        userid: req.body.userId,
        plantid: req.body.plantId,
        photopath: `/${req.file.originalname}`
      }
      connection.query(insertPhoto, insertUserPhotoParams, function (err, rows, fields) {
        if (err) {
          console.log(err);
        } else {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          res.send("Success!")
        }
      })
  })



module.exports = router;
