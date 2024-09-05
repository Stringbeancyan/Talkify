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
app.use(express.static('public'));  // Serve static files from the 'public' directory

// In-memory store for users and messages
const users = {};  // { socketId: username }
const messages = {};  // { username: [message1, message2, ...] }

// Handle user registration
app.post('/register', (req, res) => {
    const { username } = req.body;
    if (users[username]) {
        return res.status(400).send('Username already taken');
    }
    users[username] = null;  // Set initial socketId as null
    messages[username] = [];
    res.status(200).send('User registered');
});

io.on('connection', (socket) => {
    let currentUser;

    // Handle user login
    socket.on('login', (username) => {
        if (users[username] !== undefined) {
            users[username] = socket.id;
            currentUser = username;
            socket.emit('login-success', messages[username]);
            io.emit('user-online', username);
        } else {
            socket.emit('login-failed', 'User not found');
        }
    });

    // Handle private message
    socket.on('send-message', (data) => {
        const { recipient, message } = data;
        if (users[recipient]) {
            io.to(users[recipient]).emit('receive-message', { sender: currentUser, message });
            messages[recipient].push({ sender: currentUser, message });
        }
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        if (currentUser) {
            users[currentUser] = null;
            io.emit('user-offline', currentUser);
        }
    });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
