const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const nconf = require('nconf');
nconf.formats.yaml = require('nconf-yaml');

global.conf = nconf.argv()
   .env()
   .file({ file: path.join(__dirname,'config.yaml'), format: nconf.formats.yaml });

app.use(express.static(path.join(__dirname,'static')));
io.on('connection', (socket) => {
  console.log("new connection from a websocket");
  setInterval(function(){
    socket.emit('timestamp',new Date().toISOString());
  },900);
});

const port = conf.get('port');
console.log(`starting server on port ${port}...`);
server.listen(port,function(){
  console.log("server started and listening!");
});
