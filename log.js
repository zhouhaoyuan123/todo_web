var fs = require("fs");
module.exports = function(data) {
  try{
    fs.appendFileSync("log.txt",data+'\n');
  }
  catch(err) {
    console.error(err);
  }
}
