const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

// Initialize app
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve static files (CSS and JS)
app.use(express.static(path.join(__dirname, 'public')));

// Run when a client connects
io.on('connection', (socket) => {
    console.log('New user connected');

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A new user has joined the chat');

    // Listen for chatMessage
    socket.on('chatMessage', (message) => {
        // Emit the message to all clients
        io.emit('message', message);
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
