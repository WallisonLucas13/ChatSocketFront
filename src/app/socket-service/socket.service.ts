import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RxStomp } from '@stomp/rx-stomp';
import { Observable, catchError, filter, map, of, share, tap } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private ws: WebSocketSubject<any>;
  constructor() {

    const params = {
      username: String(String(localStorage.getItem("username")))
    }

    this.ws = webSocket("wss://ideal-bells-production.up.railway.app/websocket?username="+params.username);

    this.ws.asObservable().subscribe();
  }

  getObserver(){
    return this.ws.asObservable();
  }

  send(data: any){
    this.ws.next(data);
  }

}
