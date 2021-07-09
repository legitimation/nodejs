
var express = require('express');
var http = require('http');
var bodyParser= require('body-parser');
var app = express();


var mysql=require('mysql');
var db=mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'qwerty1234',
    database : 'ex'
});

db.connect();


app.set('port',process.env.PORT || 80);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var router = express.Router();

//첫 번째 미들웨어
app.use(function(req, res, next) {

    console.log('첫 번째 미들웨어 호출 됨');
    var approve ={'approve_id':'NO'};


    var paramId = req.body.id;
    console.log('id : '+paramId);



    db.query('SELECT DEPTNO FROM EMP WHERE ENAME = ?',[paramId], function(error, results){
        if (error) {
            console.log("there is an error");
        }
        var user=results[0].DEPTNO;
        console.log(user);

        approve.approve_id = user;

        res.send(approve);
    });



    //아이디 일치여부 flag json 데이터입니다.
    // if(paramId == 'test01') approve.approve_id = 'OK';
    // if(paramPassword == '123') approve.approve_pw = 'OK';


    // console.log(approve);
    // res.send(approve);


    
});

var server = http.createServer(app).listen(app.get('port'),function(){
   console.log("익스프레스로 웹 서버를 실행함 : "+ app.get('port')); 
});