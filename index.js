const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', function(){ /* … */ });
//TODO don't user an hardcoded port
server.listen(3000);