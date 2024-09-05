const socket = io();

document.addEventListener('DOMContentLoaded', () => {
    const setUsernameButton = document.getElementById('setUsername');
    const sendMessageButton = document.getElementById('sendMessage');
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('messageInput');
    const chatDiv = document.getElementById('chat');

    let username = '';

    setUsernameButton.addEventListener('click', () => {
        username = usernameInput.value.trim();
        if (username) {
            alert(`Username set to: ${username}`);
        } else {
            alert('Please enter a username.');
        }
    });

    sendMessageButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message && username) {
            socket.emit('sendMessage', { user: username, text: message });
            messageInput.value = '';
        } else {
            alert('Please enter a message and set a username.');
        }
    });

    socket.on('receiveMessage', (message) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `<span class="username">${message.user}:</span> ${message.text}`;
        chatDiv.appendChild(messageDiv);
        chatDiv.scrollTop = chatDiv.scrollHeight;
    });
});
