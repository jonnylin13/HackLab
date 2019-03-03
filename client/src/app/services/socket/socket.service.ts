import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { ClientService } from '../../services/client/client.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: SocketIOClient.Socket;
  constructor(private client: ClientService) {
    this.socket = io('http://localhost:3000/');
    this.socket.on('handshake_ack', msg => this._onHandshakeAck(msg));
    this.socket.on('update', msg => this._onUpdate(msg));
  }

  _sendMessage(type: string, msg: string) {
    if (this.socket.connected) {
      this.socket.emit(type, msg);
      return;
    }
    this.socket.connect();
    this.socket.on('connect', () => {
      this.socket.emit(type, msg);
      return;
    });
  }

  handshake() {
    this._sendMessage(
      'handshake',
      JSON.stringify({
        labId: this.client.getLabId(),
        token: this.client.getToken()
      })
    );
  }

  _onHandshakeAck(msg: string) {
    let data = JSON.parse(msg);
    if (data['code'] !== 1) {
      console.log(data);
      return;
    }
    this.client.setLab(data['lab']);
  }

  _onUpdate(msg: string) {
    let data = JSON.parse(msg);
    this.client.setLab(data['lab']);
  }

  getSocket() {
    return this.socket;
  }
}
