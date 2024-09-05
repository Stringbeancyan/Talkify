const socket = io();  // Ensure this is after socket.io.js is loaded

document.getElementById('send-button').addEventListener('click', () => {
    const message = document.getElementById('message-input').value;
    const username = document.getElementById('username').value;
    if (message && username) {
        socket.emit('send-message', { username, message });
        const li = document.createElement('li');
        li.textContent = `You: ${message}`;
        document.getElementById('messages').appendChild(li);
        document.getElementById('message-input').value = '';  // Clear the input field
    }
});

// Listen for incoming messages
socket.on('receive-message', (data) => {
    const li = document.createElement('li');
    li.textContent = `${data.username}: ${data.message}`;
    document.getElementById('messages').appendChild(li);
});
