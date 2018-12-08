var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../config/dbconfig.js');
var connection = mysql.createConnection(dbconfig);
var path = require('path')


// notice - list
router.get('/list', function(req, res, next){
    connection.query("SELECT NID, title, ndate, hits \
                      FROM Notice \
                      ORDER BY ndate DESC, NID ASC limit 20;", function(err, rows, fields){
      if(err){
        console.log("/notice/list error");
        throw err;
      }
      res.send(rows)    
    })
  })