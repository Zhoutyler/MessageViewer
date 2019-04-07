var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var fs = require('fs');
var initial_data = "../../messages.json"

var app = express();
app.use(bodyParser.json());       // use body-parser to parse request body json
app.use(bodyParser.urlencoded({ extended : false}));


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password"
});

/* 
Connect to mysql
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
app.get("/get/star", function(req , res){
  var query = "select count(*) as starCount from message where isStarred = 1";
  executeQuery(query, res);
});

app.get("/get/messages", function(req, res) {
  var query = "select * from message";
  executeQuery(query, res);  
})

app.get("/get/highlight", function(req, res) {
  console.log(req.query.search);
  var query = `
  select userid from message where content REGEXP '.*${req.query.search}.*'
  `;
  executeQuery(query, res);
});

/*
Put APIs
*/
app.put("/put/starstatus", function(req, res) {
  console.log(req.body);
  var query = `
  update message set isstarred = ${req.body.isstarred}
  where userid = ${req.body.userid}
  `;
  executeQuery(query, res);
})

app.put("/put/trashstatus", function(req, res) {
  console.log(req.body);
  var query = `
  update message set istrashed = ${req.body.istrashed}
  where userid = ${req.body.userid}
  `;
  executeQuery(query, res);
});

app.put("/put/sort", function(req, res) {
  var query = `
  select * from message order by score desc
  `;
  console.log("query sorted records");
  executeQuery(query, res);
});


function createDB() {
  con.query("DROP DATABASE IF EXISTS message_viewer", function (err, result) {
    if (err) throw err;
    console.log("Database dropped");
  });
  con.query("CREATE DATABASE message_viewer", function (err, result) {
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




