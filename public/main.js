// Ensure socket.io is initialized
const socket = io();

// Send message event on form submission
document.getElementById('message-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Get the message from the input field
    const message = document.getElementById('message-input').value;

    // Emit the message to the server
    socket.emit('chatMessage', message);

    // Clear the input field
    document.getElementById('message-input').value = '';
});

// Listen for new messages from the server
socket.on('message', (message) => {
    const messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    document.getElementById('messages').appendChild(messageDiv);
});
