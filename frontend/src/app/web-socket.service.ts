import { Injectable } from '@angular/core';
import { Chat } from './model/chat.model';
import { MessageType } from './model/type';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  webSocket!: WebSocket;
  messages: Chat[] = [];
  constructor() {}
  openWebsocketConnection() {
    this.webSocket = new WebSocket('ws://localhost:8080/chat');
    this.webSocket.onopen = (e) => {};
    this.webSocket.onmessage = (e) => {
      const chatMsg: Chat = JSON.parse(e.data);
      if (chatMsg.content == 'User Already Exists') this.messages = [];
      else this.messages.push(chatMsg);
    };
  }

  sendWebSocketMessage(chatMsg: Chat) {
    this.webSocket.send(JSON.stringify(chatMsg));
  }
  closeWebsocketConnection() {
    this.webSocket.close();
  }
}
