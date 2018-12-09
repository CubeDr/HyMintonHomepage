var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../config/dbconfig.js');
var connection = mysql.createConnection(dbconfig);
var path = require('path')


// 이름 리턴
router.get('/name/:id', function(req, res, next){
  try{
    var id = req.params.id
    connection.query("SELECT lname,fname \
                      FROM User \
                      WHERE UserID=?;", [id], function(err, rows, fields){
      if(err){
        console.log("/notice/list error");
        throw err;
      }
      res.send(rows)    
  })}
  catch(err){
    console.log("/name/id error");
  }
})

// 단과대 생성 api
router.post('/college/new', function(req, res, next){
  var cname = req.body.cname;
  var uname = req.body.uname;

  connection.query("INSERT INTO College(CollegeID, UnvID) \
                    VALUES(?, ?)", [cname, uname], function(err, rows, fields){
    if(err){
      res.send(400);
      throw err;
    }
    res.send(200);    
  })
})

// 단과대 리스트 api
router.get('/college/:id', function(req, res, next){
  var id = parseInt(req.params.id, 10);
  var uname;
  if (id == 0)
    uname = "한양대"
  else
    uname = "한양여대"

  connection.query("SELECT * FROM College \
                    WHERE UnvID=?", [uname], function(err, rows, fields){
    if(err){
      res.send(400);
      throw err;
    }
    res.send(rows);    
  })
})

// 학과 생성 api
router.post('/dept/new', function(req, res, next){
  var cname = req.body.cname;
  var dname = req.body.dname;

  connection.query("INSERT INTO Department(DeptID, ClgID) \
                    VALUES(?, ?)", [dname, cname], function(err, rows, fields){
    if(err){
      res.send(400);
      throw err;
    }
    res.send(200);    
  })
})

// 학과 리스트 api
router.get('/dept/:id', function(req, res, next){
  var cname = req.params.id;
  connection.query("SELECT * FROM Department \
                    WHERE ClgID=?", [cname], function(err, rows, fields){
    if(err){
      res.send(400);
      throw err;
    }
    res.send(rows);    
  })
})

// User - 회원가입
router.post('/user/new', function(req, res, next){
  var id = req.body.id;
  var pw = req.body.pw;
  var lname = req.body.lname;
  var fname = req.body.fname;
  var auth = req.body.authority;
  var dname = req.body.dname;
  
  connection.query("SELECT COUNT(*) as cnt \
                    FROM User \
                    WHERE UserID=?", [id, pw],
  function(err, rows, fields){
    if(err){
      res.send(400);
      throw err;
    }
    if(rows[0].cnt < 1)
    {
      connection.query("INSERT INTO User(UserID, password, lname, fname, authority, DID) \
                        VALUES(?,password(?),?,?,?,?)", [id, pw, lname, fname, auth, dname],
      function(err, rows, fields){
        if(err){
          console.log("회원가입 시도 실패!")
          res.send(400);
          throw err;
        }
        res.send(200);    
    })}
    else{
      console.log("중복 학번 회원가입 시도!")
      res.send(401);
    }
  })
})

// User - 로그인
router.post('/user/login', function(req, res, next){
  var id = req.body.id;
  var pw = req.body.pw;
  
  connection.query("SELECT COUNT(*) as cnt \
                    FROM User \
                    WHERE UserID=? AND password=password(?)", [id, pw],
  function(err, rows, fields){
    if(err){
      res.send(400);
      throw err;
    }

    if(rows[0].cnt > 0)
    {
      connection.query("SELECT UserID as id, lname, fname, authority, DID as dname \
                        FROM User \
                        WHERE UserID=?", [id],
        function(err2, rows2, fields2){
          res.send(rows2);
        })
    }
    else{
      res.send(400);
    }
  })
})

// User - 수정 - 비밀번호
router.post('/user/mod/pw', function(req, res, next){
  var id = req.body.id;
  var pw = req.body.newpw;

  connection.query("UPDATE User\
                    SET password = password(?)\
                    WHERE UserID=?;", [pw,id],function(err, rows, fields){
    if(err){
      console.log("비밀번호 수정 오류!");
      res.send(400);
    }
    res.send(200);    
  })
})

// User - 수정 - 권한
router.post('/user/mod/auth', function(req, res, next){
  var id = req.body.id;
  var auth = req.body.auth;

  connection.query("UPDATE User\
                    SET authority = ?\
                    WHERE UserID= ? ;", [auth,id],function(err, rows, fields){
    if(err){
      console.log("권한 수정 오류!");
      res.send(400);
    }
    res.send(200);    
  })
})

// User - 모든 회원
router.get('/user/all', function(req, res, next){
  connection.query("SELECT UserID, lname, fname, DID, authority as auth \
                    FROM User; ",
  function(err, rows, fields){
    if(err){
      res.send(err);
      throw err;
    }
    res.send(rows);    
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
      res.send(400);
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
                    WHERE n.UID=u.UserID AND n.NoticeID=? ;\
                    UPDATE Notice\
                    SET hits = hits+1\
                    WHERE NoticeID=?;", [id, id],function(err, rows, fields){
    if(err){
      console.log("게시글 조회 오류!");
      res.send(400);
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

  connection.query("INSERT INTO Notice(title, ndate, ncontent, UID)\
                    VALUES (?, NOW(), ?, ?);", [title, content, id],function(err, rows, fields){
    if(err){
      console.log("게시물 작성 오류!");
      res.send(400);
    }
    res.send(200);    
  })
})

// notice - 게시물 수정
router.post('/notice/mod', function(req, res, next){
  var id = req.body.id;
  var nid = req.body.nid;
  var content = req.body.content;
  var title = req.body.title;

  connection.query("UPDATE Notice\
                    SET title = ?, ncontent=?\
                    WHERE NoticeID=? AND UID=?;", [title, content,nid,id],function(err, rows, fields){
    if(err){
      console.log("게시물 수정 오류!");
      res.send(400);
    }
    res.send(200);    
  })
})

// notice - 게시물 삭제
router.post('/notice/del', function(req, res, next){
  var nid = req.body.nid;
  var id = req.body.id;

  connection.query("DELETE FROM Notice \
                    WHERE NoticeID = ? AND UID= ?;", [nid, id],
  function(err, rows, fields){
    if(err){
      console.log("게시물 삭제 오류!");
      res.send(400);
    }
    res.send(200);    
  })
})


// 회비 - 전체회원 납부현황
router.get('/payment/all', function(req, res, next){
  connection.query("SELECT DISTINCT \
                            UserID as id,\
                            (SELECT COUNT(*) FROM Payment, User WHERE UserID= UID AND UID =id AND paid=1) as paid,\
                            (SELECT COUNT(*) FROM Payment, User WHERE UserID= UID AND UID =id AND paid=0) as npaid,\
                            (SELECT pdate FROM Payment, User WHERE UserID = UID AND UID =id AND paid=1 ORDER BY pdate DESC LIMIT 1) as lastpaid\
                    FROM User, Payment\
                    WHERE UserID = UID;", 
  function(err, rows, fields){
    if(err){
      console.log("전체 회원 납부 현황 조회 실패!");
      res.send(400);
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
      res.send(400);
      throw err;
    }
    res.send(rows);
  })
})

// 회비 - 본인 납부 조회
router.get('/payment/:id', function(req, res, next){
  var id = req.params.id
  connection.query("SELECT FID as fid, pdate as date, price \
                    FROM Payment, Fee\
                    WHERE UID = ? AND FID=FeeID\
                    ORDER BY FID ASC;", [id], function(err, rows, fields){
    if(err){
      console.log("본인 회비 납부 조회 실패!");
      res.send(400);
      throw err;
    }
    res.send(rows);
  })
})

// 회비 - 본인 납부 조회 ( 카운트 )
router.get('/payment/:id/:cnt', function(req, res, next){
  var id = req.params.id
  var cnt = parseInt(req.params.cnt, 10)
  connection.query("SELECT FID, pdate\
                    FROM Payment \
                    WHERE UID = ?\
                    ORDER BY FID DESC LIMIT ?;", [id, cnt], function(err, rows, fields){
    if(err){
      console.log("본인 회비 납부 조회 실패!");
      res.send(400);
      throw err;
    }
    res.send(rows);
  })
})

// 회비 - 수정
router.post('/payment/mod', function(req, res, next){
  var id = req.body.id;
  var fee = req.body.fee;
  var date = req.body.date;
  
  connection.query("UPDATE Payment\
                    SET pdate=?, paid=1\
                    WHERE FID=? AND UID=?", [date, fee, id], function(err, rows, fields){
    if(err){
      console.log("회비 수정 실패!");
      res.send(400);
      throw err;
    }
    res.send(rows);
  })
})


// 회비 - 추가
router.post('/fee/new', function(req, res, next){
  var date = req.body.date;
  var price = req.body.price;
  
  connection.query("INSERT INTO Fee(FeeID, price)\
                    VALUES(?, ?);", [date, price], function(err, rows, fields){
    if(err){
      console.log("회비 추가 실패!");
      res.send(400);
      throw err;
    }
  })
  connection.query("INSERT INTO Payment(FID,UID)\
                    SELECT FeeID, UserID\
                    FROM User, Fee\
                    WHERE FeeID = ?;", [date, price,date], function(err, rows, fields){
    if(err){
      console.log("지불정보 생성 추가 실패!");
      res.send(400);
      throw err;
    }
    res.send(200);
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
      res.send(400);
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
  connection.query("SELECT ename as name, estarttime as start, eendtime as end, member\
                    FROM Event \
                    WHERE ? <= eendtime AND\
                          ? >= estarttime", [date1, date2],
  function(err, rows, fields){
    if(err){
      console.log("해당 날짜 행사 조회 실패!");
      res.send(400);
      throw err;
    }
    res.send(rows);
  })
})

// 행사 - 추가
router.post('/event/new', function(req, res, next){
  var name = req.body.name;
  var place = req.body.place;
  var stime = req.body.time.start;
  var etime = req.body.time.end;
  var member = req.body.member;

  connection.query("INSERT INTO Event(ename, place, estarttime, eendtime, member) \
                    VALUES( ?,?,?,?,?  )", [name, place, stime, etime,member],
  function(err, rows, fields){
    if(err){
      console.log("행사 추가 실패!");
      res.send(400);
      throw err;
    }
    res.send(rows);
  })
})

//셔틀콕 목록
router.get('/order/list', function(req, res, next){
  connection.query("SELECT o.OrderID as oid, u.UserID as id, o.odate as date, u.lname as lname, u.fname as fname, \
                           amount, o.ocontent as content, paid, given\
                    FROM hymt_db.Order o, User u\
                    WHERE o.UID = u.UserID;", 
  function(err, rows, fields){
    if(err){
      console.log("주문 목록 읽어오기 실패!");
      res.send(400);
      throw err;
    }
    res.send(rows);
  })
})

//셔틀콕 주문
router.post('/order/new', function(req, res, next){
  var id = req.body.id;
  var amount = req.body.amount;
  var content = req.body.content;
  connection.query("INSERT INTO hymt_db.Order(UID, amount, ocontent)\
                    VALUES(?, ?, ?)",[id, amount, content], 
  function(err, rows, fields){
    if(err){
      console.log("셔틀콕 주문 추가 실패!");
      res.send(400);
      throw err;
    }
    res.send(rows);
  })
})

//셔틀콕 재고
router.get('/order/left', function(req, res, next){
  connection.query("SELECT -1 * sum(amount) as sum \
                    FROM hymt_db.Order", 
  function(err, rows, fields){
    if(err){
      console.log("셔틀콕 재고 계산 실패!");
      res.send(400);
      throw err;
    }
    res.send(rows);
  })
})

//셔틀콕 정보 수정
router.post('/order/mod', function(req, res, next){
  var id = req.body.id;
  var oid = req.body.oid;
  var paid = req.body.paid;
  var given = req.body.given;

  connection.query("UPDATE hymt_db.Order, User \
                    SET paid = ?, given = ?\
                    WHERE UserID = ? AND authority >= 4 AND OrderID = ?;",[paid, given, id, oid], 
  function(err, rows, fields){
    if(err){
      console.log("주문 정보 갱신 실패!");
      res.send(400);
      throw err;
    }
    res.send(200);
  })
})

module.exports = router;
