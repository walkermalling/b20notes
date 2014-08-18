/*jslint node: true */
'use strict';

var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

mongoose.connect( process.env.MONGO_URL || 'mongodb://localhost/notes-development' );

app.use(bodyparser.json());
require('./routes/note-routes')(app); //

var server = http.createServer(app);

app.set('port', process.env.PORT || 3000 );

server.listen(app.get('port'), function() {
  console.log('Server running on :3000');
});
