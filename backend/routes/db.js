var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../config/dbconfig.js');
var connection = mysql.createConnection(dbconfig);

// configuration

router.get('/1', function(req, res, next) {
    connection.query("SELECT * FROM User WHERE ID='2014004120';",function(err, rows, fields){
      if(err){
        console.log("error");
        throw err;
      }
      console.log('ID : ', rows[0].fname , rows[0].lname);
    });
  });
  

module.exports = router;
