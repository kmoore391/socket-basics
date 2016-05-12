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
    //console.log("new message: ");
   // console.log(message.text);
    var momentTimestamp = moment.utc(message.timestamp);
    var $message = jQuery('.messages')
    
    $message.append('<p><strong>' + momentTimestamp.local().format('DD/MM/YY h:mm a') + ' ' + message.name + ': ' + '</strong></p>')
    $message.append('<p>' + message.text +'</p>');
    
   
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