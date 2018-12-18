const express = require('express');
const app = express();
const indexRouter = require('./routes');
const path = require('path');
const port = 3000;
const localtunnel = require('localtunnel');

app.use(express.static(path.join(__dirname, '../front/public')));

app.use('/', indexRouter);

var server = app.listen(port, function(){console.log(`Listening at ${port}...`)});

var io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.emit('connection');

    socket.on('newUser', function(nickname){
        io.emit('adviseNewUserEntered', nickname);
    });

    socket.on('message', function(nickname, message){
        io.emit('insertMessage', nickname, message);
    });

    socket.on('userDisconnected', function(nickname){
        io.emit('adviseUserLeft', nickname);
    });
});