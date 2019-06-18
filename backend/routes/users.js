var express = require('express');
var dbCreds = require('./shared/credentials');
var router = express.Router();


/* GET users listing. */
router.get('/:id', function(req, res, next) {

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()

  connection.query(`SELECT * from users where userid=${req.params.id}`, function (err, rows, fields) {
    if (err) throw err
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(rows));
  })

  connection.end()
});

router.post('/add', function(req, res, next){
  let addUser = `insert into users(userid, username, password)
                  values(${req.params.id}, ${req.params.username}, ${req.params.password})`

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()

  connection.query(addUser, function (err, rows, fields) {
    if (err) throw err
    res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(rows));
  })
  connection.end()
})

module.exports = router;
