const http = require('http');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const io = require('socket.io');
const SERVER_OPTIONS = {
  serveClient: false,
  cookie: false
};

class SocketServer {
  constructor(labService) {
    this.labService = labService;
    this.httpServer = http.createServer();
    this.io = io(this.httpServer, SERVER_OPTIONS);
    this.httpServer.listen(3000);
    console.log('Server listening on port 3000.');
    this.io.on('connection', socket => this._onConnection(socket));
    this.sockets = {};
  }

  _onConnection(socket) {
    console.log('User connected.');
    socket.on('handshake', msg => this._onHandshake(socket, msg));
    socket.on('disconnect', () => {
      console.log('User disconnected.');
    });
  }

  _onHandshake(socket, msg) {
    let data = JSON.parse(msg);
    let token = data['token'];
    let labId = data['labId'];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        socket.emit('handshake_ack', JSON.stringify({ code: 0 }));
        socket.disconnect();
      }
      let userId = decoded.userId;
      let lab = this.labService.getLab(labId);
      if (lab === null) {
        socket.emit('handshake_ack', JSON.stringify({ code: -1 }));
        return;
      }
      socket.join(labId);
      socket.emit(
        'handshake_ack',
        JSON.stringify({
          code: 1,
          lab: lab
        })
      );
    });
  }

  _emit(labId, type, msg) {
    this.io.to(labId).emit(type, msg);
  }

  update(lab) {
    this._emit(
      lab.id,
      'update',
      JSON.stringify({
        lab: lab
      })
    );
  }

  disconnect(lab) {
    this._emit(lab.id, 'disconnect');
  }

  getIo() {
    return this.io;
  }
}

module.exports = SocketServer;
