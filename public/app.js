const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files from 'public' directory

// In-memory store for users and messages
const users = {};  // { username: socketId }
const messages = {};  // { username: [{sender: "username", message: "message"}] }

// Handle incoming messages
io.on('connection', (socket) => {
    let currentUser;

    socket.on('set-username', (username) => {
        users[username] = socket.id;
        currentUser = username;
        if (!messages[username]) {
            messages[username] = [];
        }
        // Send previous messages to the new user
        socket.emit('login-success', messages[username]);
        io.emit('user-online', username);
    });

    socket.on('send-message', (data) => {
        const { recipient, message } = data;
        if (users[recipient]) {
            io.to(users[recipient]).emit('receive-message', { sender: currentUser, message });
            messages[recipient].push({ sender: currentUser, message });
            messages[currentUser].push({ sender: currentUser, message });
        }
    });

    socket.on('disconnect', () => {
        if (currentUser) {
            delete users[currentUser];
            io.emit('user-offline', currentUser);
        }
    });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
