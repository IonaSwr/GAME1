var express = require('express');
var vhost = require( 'vhost' );
var fs = require('fs');
var path = require('path');
var app = express();

app.use(vhost('localhost',express.static( "client") ));

var http = require('http');
http.createServer(app).listen(8080);