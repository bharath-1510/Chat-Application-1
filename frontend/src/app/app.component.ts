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
  hidden: boolean = false;

  sendMessage() {
    const chatMsg = {
      name: this.user,
      content: this.content,
      type: 'CHAT',
    } as Chat;
    this.webSocket.sendWebSocketMessage(chatMsg);
    this.content = '';
  }
  openConnection() {
    let tmp = window.prompt('Enter the Name');

    if (tmp && tmp.trim() !== '') {
      this.user = tmp;
      const chatMsg = {
        name: this.user,
        content: this.content,
        type: 'JOIN',
      } as Chat;
      this.webSocket.openWebsocketConnection(chatMsg);
      this.hidden = true;
    } else this.openConnection();
  }
  ngOnInit(): void {
    this.openConnection();
  }
  ngOnDestroy(): void {}
  leaveChat() {
    const chatMsg = {
      name: this.user,
      content: this.content,
      type: 'LEAVE',
    } as Chat;
    this.webSocket.sendWebSocketMessage(chatMsg);
    // this.webSocket.closeWebsocketConnection();
  }
}
