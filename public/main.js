// Connect to Socket.IO
const socket = io();

// Send message when the form is submitted
document.getElementById('message-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting normally

    // Get message from input field
    const message = document.getElementById('message-input').value;

    // Emit message to server
    socket.emit('chatMessage', message);

    // Clear the input field after sending
    document.getElementById('message-input').value = '';
});

// Listen for 'message' event and display it
socket.on('message', (message) => {
    // Create a new div for the message
    const messageDiv = document.createElement('div');
    messageDiv.innerText = message;

    // Append the message to the messages container
    document.getElementById('messages').appendChild(messageDiv);
});
