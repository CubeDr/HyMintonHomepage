var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../config/dbconfig.js');
var connection = mysql.createConnection(dbconfig);
var path = require('path')

router.get('/name/:id', function(req, res, next){
  var id = parseInt(req.params.id, 10)
  connection.query("SELECT lname,fname \
                    FROM User \
                    WHERE UserID=?;", [id], function(err, rows, fields){
    if(err){
      console.log("/notice/list error");
      throw err;
    }
    res.send(rows)    
  })
})

// notice - list
router.get('/notice/list', function(req, res, next){
  connection.query("SELECT NoticeID as id, lname, fname, title, ndate as date, hits \
                    FROM Notice, User \
                    WHERE UID=UserID\
                    ORDER BY ndate DESC, NoticeID ASC limit 20;", function(err, rows, fields){
    if(err){
      console.log("/notice/list error");
      throw err;
    }
    res.send(rows)    
  })
})

// notice - by ID
router.get('/notice/:id', function(req, res, next){
  var id = parseInt(req.params.id, 10)
  connection.query("SELECT n.NoticeID as id, n.title as title, u.fname as fname, u.lname as lname\
                            , n.ndate as date, n.hits as hits, n.ncontent as content\
                    FROM Notice n, User u \
                    WHERE n.UID=u.UserID AND n.NoticeID=? \
                    ORDER BY n.ndate DESC, n.NoticeID ASC limit 1;", [id],function(err, rows, fields){
    if(err){
      console.log("해당 게시물이 삭제되거나 변경되었습니다.");
      res.send(-1);
      throw err;
    }
    res.send(rows)    
  })
})

// notice - 새 게시물 추가
router.post('/notice/new', function(req, res, next){
  var id = req.body.id;
  var content = req.body.content;
  var title = req.body.title;

  console.log(id);
  console.log(content);
  connection.query("INSERT INTO Notice(title, ndate, ncontent, UID)\
                    VALUES (?, NOW(), ?, ?);", [title, content, id],function(err, rows, fields){
    if(err){
      console.log("게시물 작성 오류!");
      res.send(400);
    }
    res.send(200);    
  })
})

// 회비 - 회원별 납부현황
router.get('/payment/all', function(req, res, next){
  connection.query("SELECT u.UserID as uid, f.FeeID as fid, p.pdate as date\
                    FROM User u, Fee f, Payment p \
                    WHERE u.UserID= p.UID and f.FeeID=p.FID\
                    ORDER BY u.UserID DESC, f.FeeID ASC;", function(err, rows, fields){
    if(err){
      console.log("회원별 납부 현황 조회 실패!");
      res.send(-1);
      throw err;
    }
    res.send(rows);
  })
})

// 회비 - 회비 미납자 조회
router.get('/payment/nopay', function(req, res, next){
  connection.query("SELECT * \
                    FROM Payment \
                    WHERE paid = 0;", function(err, rows, fields){
    if(err){
      console.log("회비 미납자 조회 실패!");
      res.send(-1);
      throw err;
    }
    res.send(rows);
  })
})

// 회비 - 본인 납부 조회
router.get('/payment/:id', function(req, res, next){
  var id = parseInt(req.params.id, 10)
  connection.query("SELECT FID as fid, pdate as date\
                    FROM Payment \
                    WHERE UID = ?\
                    ORDER BY FID ASC;", [id], function(err, rows, fields){
    if(err){
      console.log("본인 회비 납부 조회 실패!");
      res.send(-1);
      throw err;
    }
    res.send(rows);
  })
})

// 회비 - 본인 납부 조회 ( 카운트 )
router.get('/payment/:id/:cnt', function(req, res, next){
  var id = parseInt(req.params.id, 10)
  var cnt = parseInt(req.params.cnt, 10)
  connection.query("SELECT FID, pdate\
                    FROM Payment \
                    WHERE UID = ?\
                    ORDER BY FID DESC LIMIT ?;", [id, cnt], function(err, rows, fields){
    if(err){
      console.log("본인 회비 납부 조회 실패!");
      res.send(-1);
      throw err;
    }
    res.send(rows);
  })
})

// 회비 - 추가
router.get('/fee/new', function(req, res, next){
  var date = req.body.date;
  var price = req.body.price;
  
  connection.query("INSERT INTO Fee(FeeID, price)\
                    VALUES(?, ?;\
                    INSERT INTO Payment(FID,UID)\
                    SELECT FeeID, UserID\
                    FROM User, Fee\
                    WHERE FeeID = ?;", [date, price,date], function(err, rows, fields){
    if(err){
      console.log("회비 추가 실패!");
      res.send(-1);
      throw err;
    }
    res.send(rows);
  })
})



// 행사 - month 전달 시 행사 날짜 전달
router.get('/event/:ym', function(req, res, next){
  var ym = req.params.ym;
  var y = ym.substring(0,4);
  var m = ym.substring(4,6);
  var nm = parseInt(m) + 1;
  var date1 = new Date(y+'-'+m+'-01');
  if (nm < 10)
    nm = '0'+nm;
  if (nm == 13){
    nm = '01';
    y = parseInt(y)+1;
  }
  
  var date2 = new Date(y+'-'+nm+'-01');
  console.log(date1)
  console.log(date2)
  connection.query("SELECT EventID as id, estarttime as start, eendtime as end\
                    FROM Event \
                    WHERE DATE(estarttime) BETWEEN ? AND ?\
                       or DATE(eendtime) BETWEEN ? AND ?;", [date1, date2, date1, date2],
  function(err, rows, fields){
    if(err){
      console.log("해당 연월 행사날짜 조회 실패!");
      res.send(-1);
      throw err;
    }
    res.send(rows);
  })
})

// 행사 - day 전달 시 행사 내용 전달
router.get('/event/:ym/:d', function(req, res, next){
  var ym = req.params.ym;
  var d = req.params.d;
  var y = ym.substring(0,4);
  var m = ym.substring(4,6);
  var date1 = y+'-'+m+'-'+d+ ' 00:00:00';
  var date2 = y+'-'+m+'-'+d+ ' 23:59:59';

  console.log(date1)
  console.log(date2)
  connection.query("SELECT EventID, estarttime, eendtime \
                    FROM Event \
                    WHERE ? <= eendtime AND\
                          ? >= estarttime", [date1, date2],
  function(err, rows, fields){
    if(err){
      console.log("해당 날짜 행사 조회 실패!");
      res.send(-1);
      throw err;
    }
    res.send(rows);
  })
})

// 행사 - 추가
router.get('/event/new', function(req, res, next){
  var name = req.body.name;
  var place = req.body.place;
  var stime = req.body.time.start;
  var etime = req.body.time.end;

  connection.query("INSERT INTO Event(ename, place, estarttime, eendtime) \
                    VALUES( ?,?,?,?  )", [name, place, stime, etime],
  function(err, rows, fields){
    if(err){
      console.log("행사 추가 실패!");
      res.send(-1);
      throw err;
    }
    res.send(rows);
  })
})

//셔틀콕 목록
router.get('/order/list', function(req, res, next){
  connection.query("SELECT o.odate as date, u.lname as lname, u.fname as fname, \
                           amount, o.ocontent as content, paid, given\
                    FROM hymt_db.Order o, User u\
                    WHERE o.UID = u.UserID;", 
  function(err, rows, fields){
    if(err){
      console.log("주문 목록 읽어오기 실패!");
      res.send(-1);
      throw err;
    }
    res.send(rows);
  })
})

//셔틀콕 주문
router.get('/order/new', function(req, res, next){
  var id = req.body.id;
  var amount = req.body.amount;
  var content = req.body.content;
  connection.query("INSERT INTO hymt_db.Order(UID, amount, ocontent)\
                    VALUES(?, ?, ?)",[id, amount, content], 
  function(err, rows, fields){
    if(err){
      console.log("셔틀콕 주문 추가 실패!");
      res.send(-1);
      throw err;
    }
    res.send(rows);
  })
})




module.exports = router;
