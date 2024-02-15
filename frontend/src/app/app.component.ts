import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Chat } from './model/chat.model';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chat-app';
  user: string = '';
  content: string = '';
  webSocket = new WebSocketService();
  sendMessage() {
    const chatMsg = {
      name: this.user,
      content: this.content,
    } as Chat;
    this.webSocket.sendWebSocketMessage(chatMsg);
    this.content = '';
  }
  ngOnInit(): void {
    this.webSocket.openWebsocketConnection();
  }
  ngOnDestroy(): void {
    this.webSocket.closeWebsocketConnection();
  }
}
