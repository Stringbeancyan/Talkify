const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.send('Socket.IO Server');
});

io.on('connection', (socket) => {
  let username;

  // Listen for the 'join' event to capture the username
  socket.on('join', (name) => {
    username = name;
    console.log(`${username} has joined the chat.`);
  });

  // Listen for 'chat message' event
  socket.on('chat message', (msgData) => {
    const message = msgData.message;
    console.log(`${username}: ${message}`);

    // Broadcast the message along with the username
    io.emit('chat message', { username: msgData.username, message: msgData.message });
  });

  socket.on('disconnect', () => {
    console.log(`${username} has disconnected`);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
