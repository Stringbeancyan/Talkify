document.getElementById('joinChat').addEventListener('click', () => {
    username = document.getElementById('username').value;
    if (username) {
        // Hide the username input and show chat box
        document.getElementById('chat').style.display = 'block';
        document.getElementById('joinChat').style.display = 'none';

        // Connect to Socket.IO server
        socket = io('https://your-app-name.herokuapp.com');  // Your backend URL

        // Log if connected successfully
        socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        // Send username to the server
        socket.emit('join', username);

        // Handle incoming messages
        socket.on('chat message', (msgData) => {
            const li = document.createElement('li');
            li.textContent = `${msgData.username}: ${msgData.message}`;
            document.getElementById('messages').appendChild(li);
        });
    }
});
