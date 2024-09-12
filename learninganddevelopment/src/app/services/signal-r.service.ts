import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  constructor() { }

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5001/notificationHub') // Backend URL
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connection Started'))
      .catch(err => console.error('Error while starting SignalR connection: ' + err));

    // Handle disconnection
    this.hubConnection.onclose(error => {
      console.error('SignalR Connection closed due to error: ', error);
      // Optional: attempt reconnection
      this.startConnection();
    });
  }

  public addReceiveMessageListener(callback: (message: string) => void) {
    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      console.log('Received message:', user, message);
      callback(message); // Invoke the callback with the message
    });
  }
}
