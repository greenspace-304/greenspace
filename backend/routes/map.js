var express = require('express');
var router = express.Router();


/* GET all markers */
router.get('/', function(req, res, next) {
  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'data123!#',
    database: 'greenspace'
  })

  connection.connect()

  connection.query(`SELECT * from markers`, function (err, rows, fields) {
    if (err) throw err

    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(rows));
  })
  connection.end()
});


/* GET all markers with a specific plantID */
router.get('/:id', function(req, res, next) {
  let plantId = req.params.id
  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'data123!#',
    database: 'greenspace'
  })

  connection.connect()

  connection.query(`SELECT * from markers where plantid=${plantId}`, function (err, rows, fields) {
    if (err) throw err

    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(rows));
  })
  connection.end()
});

router.post('/add_marker', function(req, res, next)){
    let addPlantMarker = `insert into markers(markerid, x_coordinate, y_coordinate, plantid)
                            values(${req.body.markerid}, ${req.body.x}, ${req.body.y}, ${req.body.plantid})`

    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'data123!#',
      database: 'greenspace'
    })
    connection.connect()
    connection.query(addPlantMarker, function (err, rows, fields) {
      if (err) throw err

      res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(Json.stringify(rows))
    })
}

module.exports = router;
