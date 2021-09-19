import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketWebService extends Socket {

  constructor() { 
    super({
      url: 'http://localhost:5000',
      options: {}
    })
  }
}
