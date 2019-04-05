var express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var initial_data = "../../messages.json"

var app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password"
});

/* 
Connect to db
*/
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  createDB();
  createTable();

  app.listen(6666);
  console.log('Server listening on port 6666');
  
  seedDatabase(initial_data);
});

/*
Get APIs
*/
app.get("/star/getstar", function(req , res){
  var query = "select count(*) as starCount from message where isStarred = 1";
  executeQuery(query, res);
});

app.get("/messages/get", function(req, res) {
  var query = "select * from message";
  executeQuery(query, res);  
})


function createDB() {
  con.query("CREATE DATABASE IF NOT EXISTS message_viewer", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  con.query("USE message_viewer", function(err, result) {
    if (err) throw err;
  });
}

function createTable() {
  const createTable = 
  `CREATE TABLE IF NOT EXISTS 
  message(
    userid INT,
    handle VARCHAR(32),
    avatar VARCHAR(128),
    timestamp DATETIME,
    source VARCHAR(32),
    content VARCHAR(1024),
    score INT,
    isstarred BOOL,
    istrashed BOOL,
    PRIMARY KEY(userid)
  )`;
  con.query(createTable, function(err, result) {
    if (err) throw err;
    console.log("Table created");
  });
}

function seedDatabase(filepath){
  var jsondata = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  var messages = jsondata.messages;

  for (var i = 0; i < messages.length; i++) {
    var date = new Date(messages[i].timestamp).toISOString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '');
    
    insertQuery = `
    INSERT IGNORE INTO message VALUES (
      ${messages[i].id},
      "${messages[i].handle}",
      "${messages[i].avatar}",
      "${date}",
      "${messages[i].source}",
      "${messages[i].content}",
      "${messages[i].score}",
      "${messages[i].meta.isStarred ? 1 : 0}",
      "${messages[i].meta.isTrashed ? 1 : 0}"
      )
    `
    console.log(insertQuery);

    con.query(insertQuery, function(err, result) {
      if (err) throw err;
    });
  }
}



function executeQuery(query, res) {
  var result
  con.query(query, function(err, result) {
    if (err) {
      console.log(err);
    }
    res.send(result);
  })

}




