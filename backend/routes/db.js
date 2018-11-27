var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../config/dbconfig.js');
var connection = mysql.createConnection(dbconfig);
var path = require('path')

// configuration
router.get('/',function(req, res, next) {
  res.render('db', { title: 'Express' })
  console.log('db test')
});

router.get('/notice/list', function(req, res, next){
  console.log('test page in !!')
  connection.query("SELECT NID, title, ndate, hits \
                    FROM Notice \
                    ORDER BY ndate DESC, NID ASC limit 5;", function(err, rows, fields){
    if(err){
      console.log("/notice/list error");
      throw err;
    }
    res.send(rows)    
  })
})

router.get('/notice/:id', function(req, res, next){

})

router.get('/s', function(req, res, next) {
  connection.query("SELECT * FROM User WHERE ID='2014004120';",function(err, rows, fields){
    if(err){
      console.log("error");
      throw err;
    }
    console.log('ID : ', rows[0].fname , rows[0].lname);
  });
});

router.get('/i', function(req, res, next) {
  connection.query("INSERT INTO hymt_db.User VALUES (\""
      +req.query.ID+"\" ,\""
      +req.query.password+"\" ,\""
      +req.query.lname+"\" ,\""
      +req.query.fname+"\" ,\""
      +req.query.authority+"\");",function(err, result){
    if(err){
      console.log("error");
      throw err;
    }
    console.log("insert");
    res.send(200, 'success');
  });
});

module.exports = router;
