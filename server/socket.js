const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const socketServer = createServer(app);
const io = new Server(socketServer);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log(socket.id)
  });

socketServer.listen(3000, () => {
  console.log('socketServer running at http://localhost:3000');
});