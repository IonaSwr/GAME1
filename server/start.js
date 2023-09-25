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
app.use(vhost('213.151.37.78',express.static( "client") ));
app.use(vhost('192.168.33.2',express.static( "client") ));
//http://192.168.33.2/
//app.use(vhost('213.151.37.78',express.static( "client") ));
//http://213.151.37.78/

http.createServer(app).listen(80);
//http.createServer(app).listen(443);
http.createServer(app).listen(8000);
http.createServer(app).listen(3000);
http.createServer(app).listen(4000);


