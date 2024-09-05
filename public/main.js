const socket = io();
let username;

document.getElementById('set-username-button').addEventListener('click', () => {
    const userInput = document.getElementById('username-input').value.trim();
    if (userInput) {
        username = userInput;
        document.getElementById('username-section').style.display = 'none';
        document.getElementById('chat-section').style.display = 'block';
        socket.emit('userJoined', username);
    }
});

document.getElementById('message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('message-input').value.trim();
    if (messageInput) {
        socket.emit('chatMessage', { username, message: messageInput });
        document.getElementById('message-input').value = '';
    }
});

socket.on('message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.username}: ${data.message}`;
    document.getElementById('messages').appendChild(messageElement);
});
