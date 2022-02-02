import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {EventEmitter, Injectable} from '@angular/core';
import {OnUpdate} from '../model/watcher/OnUpdate';

@Injectable({
  providedIn: 'root',
})
export class UpdateWatcher {
  update: EventEmitter<OnUpdate> = new EventEmitter<OnUpdate>();
  private stompClient;
  private baseUrl = '/cms/socket';

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const sockJsProtocols = ['xhr-streaming', 'xhr-polling'];
    const ws = new SockJS(this.baseUrl, null, {transports: sockJsProtocols});
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.reconnect_delay = 5000;
    this.stompClient.connect({}, (frame) => {
      that.stompClient.subscribe('/cms-update', (message) => {
        if (message.body) {
          console.log('message');
          this.update.emit(JSON.parse(message.body));
        }
      });
    });
  }
}
