import socketIoClient from 'socket.io-client';
import { API_URL } from './config';

class Socket {

  private static socket: SocketIOClient.Socket;

  public static init() {
    this.socket = socketIoClient(API_URL);
  }

  public static onSample(callback: (sample: string) => void): void {
    this.socket.on('new sample', callback);
  }

  public static onReading(callback: (reading: reading) => void): void {
    this.socket.on('new reading', (rawData: string) => {
      callback(JSON.parse(rawData));
    });
  }
}

export default Socket;
