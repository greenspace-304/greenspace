var express = require('express');
var dbCreds = require('./shared/credentials')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let questionQuery = `select * from questions`;
  let answerQuery = `select * from answers`;

  let responseBody = {questions: [], answers: []}

  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })
  connection.connect()

  let questionPromise = new Promise(function(resolve, reject){
    connection.query(questionQuery, function (err, rows, fields) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    })
  })

  let answerPromise = new Promise(function(resolve, reject){
    connection.query(answerQuery, function (err, rows, fields) {
      if (err) {
        return reject(err)
      }
      resolve(rows);
    })
  })

  questionPromise.then(function(result){
    responseBody.questions = result;
  }, function(err){
    console.log(err);
  })

  answerPromise.then(function(result){
    responseBody.answers = result;
  }, function(err){
    console.log(err);
  })

  Promise.all([questionPromise, answerPromise])
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

router.get('/:sql', function(req, res, next) {
  var query = req.params.sql;
  var newQuery = query.replace(/&/g, ' and ');

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: dbCreds.dbUsername,
    password: dbCreds.dbPassword,
    database: 'greenspace'
  })

  connection.connect()

  connection.query(`select p.plantid as plantID, p.CommonName from plants p where ${newQuery}`, function (err, rows, fields) {
    if (err) throw err
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(rows));
  })

  connection.end()
});

module.exports = router;
