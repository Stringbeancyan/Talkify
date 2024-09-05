const socket = io();

document.getElementById('compose-btn').addEventListener('click', () => {
    document.getElementById('compose-form').style.display = 'block';
});

document.getElementById('send-button').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const recipient = document.getElementById('recipient').value;
    const message = document.getElementById('message-input').value;

    if (username && recipient && message) {
        socket.emit('send-message', { username, recipient, message });
        document.getElementById('compose-form').style.display = 'none';
        document.getElementById('message-input').value = '';
    } else {
        alert('Please fill in all fields');
    }
});

socket.on('receive-message', (data) => {
    const li = document.createElement('li');
    li.textContent = `${data.username} to ${data.recipient}: ${data.message}`;
    document.getElementById('message-list').appendChild(li);
});
