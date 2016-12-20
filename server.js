var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var url = require('url');
var twitter = require('ntwitter');
var streamHandler = require('./stream_handler')
var config = require('./config')

app.use(express.static(__dirname + '/public'));

io.on('connection', function(client) {
  console.log("Client connected");
});

var twit = new twitter(config.twitter);
twit.stream('statuses/filter',{ track: 'Javascript, #Javascript'}, function(stream){
  streamHandler(stream, io);
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

server.listen(8080);
