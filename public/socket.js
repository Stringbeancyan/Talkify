const socket = io(); // Connect to the server

// Receive messages from the server
socket.on('chat message', function(msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    document.getElementById('messages').appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
