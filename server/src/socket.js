const jwt = require('jsonwebtoken');
require('dotenv').config();
const io = require('socket.io');
const SERVER_OPTIONS = {
  serveClient: false,
  cookie: false
};

class SocketServer {
  constructor(labService, server) {
    this.labService = labService;
    this.io = io(server, SERVER_OPTIONS);
    this.io.on('connection', socket => this._onConnection(socket));
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
