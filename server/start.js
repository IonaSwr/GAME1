var express = require('express');
var vhost = require( 'vhost' );
var fs = require('fs');
var app = express();
var http = require('http');

app.all('*', function(req, res, next) {
  console.log( req.originalUrl );
  next();
});  

app.get('/', (req,res)=>{
  res.redirect('/home');
});

app.use('/data', require('../api/data'));
app.use('/tests', require('../api/tests'));
app.use('/home', require('../api/home'));
app.use(vhost('localhost',express.static( "client") ));

http.createServer(app).listen(8080);

