var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var url = require('url');
var twitter = require('ntwitter');
var streamHandler = require('./stream_handler')
var config = require('./config')

var twit = new twitter(config.twitter);
twit.stream('statuses/filter',{ track: 'Trump, #Trump'}, function(stream){
  streamHandler(stream,io);
});

io.on('connection', function(client) {
  console.log("Client connected");
});

io.on('tweet', function(tweet) {
  console.log('new tweet comes in');
  response.locales = {tweet: tweet};
  response.render('index.ejs');
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

server.listen(8080);

