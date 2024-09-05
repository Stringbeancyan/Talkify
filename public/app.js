const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

// Initialize app and create server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve static files (like CSS and JS)
app.use(express.static(path.join(__dirname, 'public')));

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New user connected');

    // Listen for 'chatMessage' event from client
    socket.on('chatMessage', (message) => {
        // Emit message to everyone including the sender
        io.emit('message', message);
    });

    // Notify when user disconnects
    socket.on('disconnect', () => {
        console.log('A user has disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
