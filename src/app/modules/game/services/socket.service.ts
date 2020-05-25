import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable, Subscriber} from 'rxjs';

import {socketUrl} from 'src/environments/environment';
import {ISocket, ISocketPayload} from '../interfaces/isocket';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: io.Socket;

  constructor() {
    this.socket = io(socketUrl);
  }

  public listen(eventName: string): Observable<ISocket> {
    return new Observable((subscriber: Subscriber<ISocket>) => {
      this.socket.on(eventName, ((data: ISocket) => subscriber.next(data)));
    });
  }

  public emit(eventName: string, payload: ISocketPayload) {
    this.socket.emit(eventName, payload);
  }

  public on(eventName: string, callbackFn: Function) {
    this.socket.on(eventName, callbackFn);
  }
}
