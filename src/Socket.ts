import socketIoClient from 'socket.io-client';
import { API_URL } from './config';

class Socket {

  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = socketIoClient(API_URL);
  }

  onSample(callback: (sample: string) => void): void {
    this.socket.on('new sample', callback);
  }

  onReading(callback: (reading: reading) => void): void {
    this.socket.on('new reading',
    callback);
  }
}

export default Socket;
