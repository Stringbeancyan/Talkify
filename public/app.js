const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

let messages = [];  // Store messages in-memory for now

io.on('connection', (socket) => {
    console.log('A user connected');

    // Send all previous messages to newly connected users
    socket.emit('previous-messages', messages);

    // When a user sends a message
    socket.on('send-message', (data) => {
        messages.push(data);  // Store message in-memory
        io.emit('receive-message', data);  // Broadcast message to all users
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
