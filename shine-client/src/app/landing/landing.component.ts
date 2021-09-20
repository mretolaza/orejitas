import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SocketWebService } from '../service/socket-web.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;

  cartas: any[] = [
    {
      numero: 1,
      figura: 0,
      img: './assets/img/cards/0_1.svg'
    }
  ];


  c = [{
    numero: 2,
    figura: 0,
    img: './assets/img/cards/0_2.svg'
  },
  {
    numero: 2,
    figura: 1,
    img: './assets/img/cards/1_2.svg'
  },
  {
    numero: 2,
    figura: 3,
    img: './assets/img/cards/3_2.svg'
  },
  {
    numero: 1,
    figura: 2,
    img: './assets/img/cards/2_1.svg'
  },
  {
    numero: 1,
    figura: 3,
    img: './assets/img/cards/3_1.svg'
  },
  {
    numero: 1,
    figura: 1,
    img: './assets/img/cards/1_1.svg'
  },
  {
    numero: 2,
    figura: 0,
    img: './assets/img/cards/0_2.svg'
  },
  {
    numero: 2,
    figura: 1,
    img: './assets/img/cards/1_2.svg'
  },
  {
    numero: 2,
    figura: 3,
    img: './assets/img/cards/3_2.svg'
  },
  {
    numero: 1,
    figura: 2,
    img: './assets/img/cards/2_1.svg'
  },
  {
    numero: 1,
    figura: 3,
    img: './assets/img/cards/3_1.svg'
  },
  {
    numero: 1,
    figura: 1,
    img: './assets/img/cards/1_1.svg'
  }];

  
  url = '';
  roomid;
  nickname;
  messages = [];

  constructor(
    private socketWebService: SocketWebService, 
    private route: ActivatedRoute,
  ) { 
    this.socketWebService.outCreateRoom.subscribe(res => {
      console.log('escuchadno--->');
      console.log('outCreateRoom--->', res.data);
      //this.sala = res.data.createdId;
    })

    this.socketWebService.outjoinRoom.subscribe(res => {
      console.log('escuchadno--->');
      console.log('outjoinRoom--->', res);
    })

    this.socketWebService.outChat.subscribe(res => {
      console.log('escuchadno--->');
      console.log('outChat--->', res);
      if (res){
        const sms = {
          message: res.data.message,
          nickname: res.data.nickname,
        }
        this.messages.push(sms);
      }
      
    })

    this.socketWebService.outStartRoom.subscribe(res => {
      console.log('escuchadno start--->');
      console.log('outStartRoom--->', res);
    })

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomid = params.get('id');
      this.nickname = params.get('nickname');
    });
  }

  addcard() {

    if (this.c.length == 0)
      return;

    const card = this.c[0];

    this.cartas.push(card)

    this.c.shift();
    console.log(card)
  }

  start() {
     
    const startr = {
      type: 'startRoom',
      data: {
        roomId: this.roomid,
        nickname: 'Admin'
      },
    };

          
    console.log('startr',startr)
    this.socketWebService.startRoom(startr); 
  }

  sendChat() {
    const message = {
      type: 'chatRoom',
      data: {
        roomId: this.roomid,
        nickname: this.nickname,
        message: 'holi chat soy ' + this.nickname, //TODO cambiar para obtener el texto
      },
    };
    
    this.socketWebService.chatSend(message);
  }
}
