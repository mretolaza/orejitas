import { EventEmitter, Injectable, Output } from '@angular/core';
//import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class SocketWebService extends Socket {


  @Output() outEven: EventEmitter<any> = new EventEmitter();
  @Output() outCreateRoom: EventEmitter<any> = new EventEmitter();
  @Output() outjoinRoom: EventEmitter<any> = new EventEmitter();
  @Output() chat: EventEmitter<any> = new EventEmitter();

  constructor(
    //public cookieService: CookieService,

  ) {
    super({
      url: 'http://localhost:5000',      
    })
    //this.listen();
    this.listenCreateRoom();
    this.listenJoinRoom();
  }

  listen = () => {
    this.ioSocket.on('evento', res => this.outEven.emit(res));   

  }
  emitEvent = (payload = {}) => {
    this.ioSocket.emit('evento', payload)
  }


  createRoom = (data = {}) => {
    this.ioSocket.emit('createRoom', data);   
  }

  listenCreateRoom = () => {
    this.ioSocket.on('createRoom', res => {
      this.outCreateRoom.emit(res)
    });   
  }

  joinRoom = (data = {}) => {
    this.ioSocket.emit('joinRoom', data);   
  }

  listenJoinRoom = () => {
    this.ioSocket.on('joinRoom', res => {
      this.outjoinRoom.emit(res)
    });   
  }

  chatSend = (data = {}) => {
    this.ioSocket.emit('chat', data);   
  }

  chatListen = () => {
    this.ioSocket.on('chat', res => {
      this.chat.emit(res)
    });   
  }
}