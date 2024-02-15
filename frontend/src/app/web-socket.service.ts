import { Injectable } from '@angular/core';
import { Chat } from './model/chat.model';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  webSocket!: WebSocket;
  messages: Chat[] = [];
  constructor() {}
  openWebsocketConnection(chatMsg: Chat) {
    this.webSocket = new WebSocket('ws://localhost:8080/chat');
    this.webSocket.onopen = (e) => {
      this.webSocket.send(JSON.stringify(chatMsg));
    };
    this.webSocket.onmessage = (e) => {
      const chatMsg = JSON.parse(e.data);
      this.messages.push(chatMsg);
    };
  }
  sendWebSocketMessage(chatMsg: Chat) {
    this.webSocket.send(JSON.stringify(chatMsg));
  }
  closeWebsocketConnection() {
    this.webSocket.close();
  }
}
