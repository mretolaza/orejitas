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
  @Output() outChat: EventEmitter<any> = new EventEmitter();
  @Output() outStartRoom: EventEmitter<any> = new EventEmitter();
  @Output() outTakeCard: EventEmitter<any> = new EventEmitter();
  @Output() outMakeMove: EventEmitter<any> = new EventEmitter();
    
  constructor(
    //public cookieService: CookieService,

  ) {
    super({
      url: 'http://localhost:5000',      
    })
    //this.listen();
    this.listenCreateRoom();
    this.listenJoinRoom();
    this.listenChat();
    this.listenStartRoom();
    this.listenTakeCard();
    this.listenMakeMove();
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
    this.ioSocket.emit('chatRoom', data);   
  }

  listenChat = () => {
    this.ioSocket.on('chatRoom', res => {
      console.log('res', res)
      this.outChat.emit(res)
    });   
  }

  startRoom = (data = {}) => {
    this.ioSocket.emit('startRoom', data);   
  }

  listenStartRoom = () => {
    this.ioSocket.on('startRoom', res => {
      this.outStartRoom.emit(res)
    });   
  }

  takeCard = (data = {}) => {
    this.ioSocket.emit('takeCard', data);   
  }

  listenTakeCard = () => {
    this.ioSocket.on('takeCard', res => {
      this.outTakeCard.emit(res)
    });   
  }

  makeMove = (data = {}) => {
    this.ioSocket.emit('makeMove', data);   
  }

  listenMakeMove = () => {
    this.ioSocket.on('makeMove', res => {
      this.outMakeMove.emit(res)
    });   
  }
}