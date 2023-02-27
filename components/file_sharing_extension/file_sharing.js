const fs = require('fs');
const mysql = require('mysql');
var conf = {
      host:"localhost",
      user:"root",
      password:"aaron123",
      database:"nodejsd"
}
exports.route = function(req,res) {
  console.log(req.cookies);
  if(req.cookies.user == undefined) {
    res.send("No user!");
  }
  else {
    connection = mysql.createConnection(conf);
    connection.connect();
    var file = req.files[0];
    var oldpath = "D:/todo_web" + "/tmp/" + file.filename;
    var newpath = "D:/todo_web" + "/uploads/" + req.cookies.user+"_"+file.originalname;
    fs.renameSync(oldpath,newpath);
    var sql = "INSERT INTO `file_share` (`user`, `file`, `code`) VALUES ('"+req.cookies.user+"','"+newpath+"','"+req.body.code+"')";
    connection.query(sql,function(error,result,fields) {
      if(error){console.error(error);}
    })
    connection.end();
    res.send("200 ok");
  }
}

exports.route2 = function(req,res) {
  connection = mysql.createConnection(conf);
  connection.connect();
  var sql1 = "SELECT * FROM file_share WHERE id = "+req.body.id+";";
  connection.query(sql1,function (error,result,fields) {
    if (error) {
      console.log(error);
      console.log("sorry2");
    }

    if (result.length >=1) {
      r = result[0];
      console.log(result);
      console.log(r.file);
      var path = r.file;
      fs.unlinkSync(path);
    }
  })

  var sql2 = "DELETE FROM `file_share` WHERE `file_share`.`id` = "+req.body.id;
  connection.query(sql2,function(error,result,fields){
    if(error) {
      console.log(error);
      res.send("sorry1");
    }
    else {
      res.send("200 ok");
    }
  })
  connection.end();
}
