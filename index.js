const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
app.use(express.static(path.join(__dirname,'static')));
io.on('connection', (socket) => {
  console.log("new connection from a websocket");
  setInterval(function(){
    socket.emit('timestamp',new Date().toISOString());
  },900);
});

//TODO don't user an hardcoded port
server.listen(3000);
