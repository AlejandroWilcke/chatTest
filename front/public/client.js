//Start App
var socket = io();
var nickname = '';

//DOM
var input = document.body.querySelector('input');
var textArea = document.body.querySelector('textarea');

//Event Listeners
input.addEventListener('keydown', function(e){
    switch(e.keyCode){
        case 13: 
            sendMessage(nickname, input.value);
            input.value = '';
            break;
    }
});

//Functions
function sendMessage(nickname, message){
    socket.emit('message', nickname, message);
}

function adviseUserLeft(){
    socket.emit('userDisconnected', nickname);
}

//Socket handler
socket.on('connection', function(){
    nickname = prompt('Nickname: ');
    socket.emit('newUser', nickname);
});

socket.on('adviseNewUserEntered', function(nickname){
    textArea.value += (nickname + ' ha entrado al lobby. \n');
});

socket.on('insertMessage', function(nickname, message){
    textArea.value += (nickname + ': ' + message + '\n');
});

socket.on('adviseUserLeft', function(nickname){
    textArea.value += (nickname + ' se ha desconectado. \n');
});