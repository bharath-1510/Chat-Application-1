import { Component, OnDestroy } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Chat } from './model/chat.model';
import { WebSocketService } from './web-socket.service';
import { Router } from '@angular/router';
import { MessageType } from './model/type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  ngOnDestroy(): void {}
  user: string = '';
  content: string = '';
  webSocket = new WebSocketService();
  header = 'REFRESH THE PAGE';
  hidden: boolean = false;
  async sendMessage(type: number) {
    const chatMsg = {
      name: this.user,
      content: this.content,
      type: type,
    } as Chat;
    this.webSocket.sendWebSocketMessage(chatMsg);
    await delay(500);
    if (this.webSocket.messages.length === 0) {
      this.header = 'USER ALREADY EXISTS\nREFRESH THE PAGE';
      this.hidden = false;
      return;
    }
    this.content = '';
    this.hidden = true;
  }
  async openConnection() {
    let tmp = window.prompt('Enter the Name');

    if (tmp && tmp.trim() !== '') {
      this.user = tmp;
      this.webSocket.openWebsocketConnection();
      this.header = 'Waiting for connection from the Server';
      await delay(2000);
      this.sendMessage(0);
    } else this.openConnection();
  }
  ngOnInit(): void {
    this.openConnection();
  }
  leaveChat() {
    this.sendMessage(2);
    this.webSocket.closeWebsocketConnection();
    this.hidden = false;
  }
  refresh() {}
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
