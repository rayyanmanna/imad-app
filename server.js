var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;

var config = {
    user:'rayyanvirus',
    database:'rayyanvirus',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool= new Pool(config);

app.get('/test-db',function(req,res){
    pool.query('SELCT * FROM test',function(err,results){
        if(err){
            res.status(500).send(err.string());
        }else{
            res.send(JSON.string(results));
        }
    })
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
