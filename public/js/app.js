var room = getQueryVariable('room') || 'Main';
var name = getQueryVariable('name') || 'Anonymous';
var socket = io();

console.log(name + ' wants to join ' + room);

jQuery('.room-title').text(room);

socket.on("connect", function () {
    console.log("Connected to server");
    
    socket.emit('joinRoom', {
        name: name,
        room: room
    });
});

socket.on('message', function (message) {
  
    var momentTimestamp = moment.utc(message.timestamp);
    var $messages = jQuery('.messages')
    var $message =jQuery('<li class="list-group-item"></li>')
    $message.append('<p><strong>' + momentTimestamp.local().format('DD/MM/YY h:mm a') + ' ' + message.name + ': ' + '</strong></p>')
    $message.append('<p>' + message.text +'</p>');
    $messages.append($message)
   
});


var $form = jQuery('#message-form');

$form.on('submit', function (event) {
    event.preventDefault();
    
    
    var $message = $form.find('input[name=message]');
  
    
    socket.emit('message',  {
        name: name,
        text: $message.val()
    });
    $message.val('');
});