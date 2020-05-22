import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { socketUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: io.Socket;
  public chatRoomName: string;

  constructor(private http: HttpClient) {
    this.socket = io(socketUrl);
  }

  public listen(eventName: string): Observable<unknown> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  public emit(eventName: string, payload: unknown) {
    this.socket.emit(eventName, payload);
  }
}
