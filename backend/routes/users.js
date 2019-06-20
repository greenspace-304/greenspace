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
  let username = req.body.username;
  let password = req.body.password;

  let addUser = `SET @MAXID = (SELECT MAX(USERID) FROM USERS) + 1; insert into users VALUES(@MAXID, '${username}', '${password}');`;

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace',
    multipleStatements: true
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

router.post('/auth', function(req, res, next){
  let username = req.body.username;
  let password = req.body.password;

  let authQuery = `SELECT USERID FROM USERS WHERE USERNAME = '${username}' AND PASSWORD = '${password}';`;

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()

  connection.query(authQuery, function (err, rows, fields) {
    if (err) throw err
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(rows));
  })
  connection.end()
})

router.post('/update', function(req, res, next){
  let updateUser = `update users set username=?, password=? where userid=?`;


  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()

  connection.query(updateUser,[req.body.username, req.body.password, req.body.userid], function (err, rows, fields) {
    if (err) throw err
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(rows));
  })

  connection.end()

})

module.exports = router;
