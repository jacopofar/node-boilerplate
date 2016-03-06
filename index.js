const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const nconf = require('nconf');
const sqlite3 = require('sqlite3').verbose();

nconf.formats.yaml = require('nconf-yaml');

global.conf = nconf.argv()
   .env()
   .file({ file: path.join(__dirname,'config.yaml'), format: nconf.formats.yaml });

global.db = new sqlite3.Database(conf.get('db_path'));

app.use(express.static(path.join(__dirname,'static')));
io.on('connection', (socket) => {
  console.log("new connection from a websocket");
  setInterval(function(){
    socket.emit('timestamp',new Date().toISOString());
  },900);

  socket.on('textarea change', function (data) {
    console.log(">> "+data);
      // we tell the client to execute 'new message'
      socket.broadcast.emit('update text', data);
    });
});

const port = conf.get('port');
console.log(`starting server on port ${port}...`);
server.listen(port,function(){
  console.log("server started and listening!");
});
