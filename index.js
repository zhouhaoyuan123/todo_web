const multer = require('multer');
var log = require("./log.js");
var fs = require("fs");
var cookieparser = require("cookie-parser");
var express = require("express");
var bodyparser = require("body-parser");
var mysql = require("mysql");
var app = express();
var body_parser = bodyparser.urlencoded({extended:false});
var conf = {
      host:"localhost",
      user:"root",
      password:"aaron123",
      database:"nodejsd"
}

const file_share = require('./components/file_sharing_extension/file_sharing.js');
const access = require('./components/file_sharing_extension/access_file.js');
app.use(express.static(__dirname+"/css"));
var conf2 = multer({ dest: './tmp'});

app.use(cookieparser());
app.get("/",function(req,res){
  console.log("here");
  res.sendFile(__dirname+"/index.html");
})
app.post("/service",body_parser,function(req,res){
  console.log(req.body.user);
  var r;
  connection = mysql.createConnection(conf);
  connection.connect();
  var q = "SELECT * FROM users WHERE username = '"+req.body.user+"';";
  connection.query(q,function(error,result,fields){

    if(error){console.error(error);log(error);};
      try{
        r = result[0];

        if(req.body.password == r.password){
          console.log(Date.now());
          res.cookie("user", req.body.user,{maxAge:24*7*60*60*1000});
          res.sendFile(__dirname+"/todo.html");
          console.log("ok");
        }
        else{
          res.sendFile(__dirname+"/usrn.html")
        }
      }
      catch(err){
        console.log("here");
        console.log("ok");
        log(err);
        res.sendFile(__dirname+"/usrn.html");
      }
  })
  connection.end();
})
app.post("/service2",body_parser,function(req,res){
  var q = "INSERT INTO users(username,password) VALUES("+"'"+req.body.user+"','"+req.body.password+"');";
  console.log(q);
  connection = mysql.createConnection(conf);
  connection.connect();
  connection.query(q,function(error,result,field){
    if(error){console.error(error);log(error);};
    res.sendFile(__dirname+"/todo.html");
    console.log("ok");

  })
  connection.end();
  fs.writeFile(req.body.user+".txt","",function(err){
    if(err){
      log(err);
    }
  })
})
app.post("/service3",body_parser,function(req,res){
  console.log(req.body.user);
  console.log("value of status:"+req.body.status);
    var s = "";
    if(req.body.status == "add"){

      var result_a = fs.appendFileSync(__dirname+"/"+req.body.user+".txt",req.body.todo+"\n");
      res.end("");
    }
    else if (req.body.status == "minus") {
      console.log("here");
      console.log(__dirname + req.body.user + ".txt");
      s = fs.readFileSync(__dirname +"/"+req.body.user + ".txt", "utf8");
      s = s.replace(req.body.todo+"\n","");
      fs.writeFileSync(__dirname +"/"+req.body.user + ".txt",s);
      res.end("");
    }

    else{
      s = "";
      var result_r = fs.readFileSync(__dirname+"/"+req.body.user+".txt","utf8");
      console.log(result_r);
      res.send(result_r);
    }

})
app.post("/file_share_service",conf2.array("file"),file_share.route);
app.post("/file_share_service2",body_parser,access.route);
app.post("/file_share_service3",body_parser,file_share.route2);
var server = app.listen(8081,function(){
  console.log("start up ok");
})
