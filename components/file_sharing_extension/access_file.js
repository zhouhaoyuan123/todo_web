const mysql = require('mysql');
const fs = require('fs');
var conf = {
      host:"localhost",
      user:"root",
      password:"aaron123",
      database:"nodejsd"
}
exports.route = function(req,res) {
  connection = mysql.createConnection(conf);
  connection.connect();
  var code = req.body.code;
  var sql = "SELECT * FROM file_share WHERE code = "+code+";";
  connection.query(sql,function (error,result,fields) {
    if (error) {
      console.error(error);
    }
    try{
      if (result.length >=1) {
        r = result[0];
        var path = r.file;
        res.setHeader("content-type","text/plain");
        res.send(fs.readFileSync(path,"utf-8"));
      } else {
        res.send("sorry")
      }
    }
    catch(err){
      res.send("sorry");
    }
  })
  connection.end();
}
