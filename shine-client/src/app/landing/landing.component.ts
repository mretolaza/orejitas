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

  message: string = '';

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
  roomid: string;
  nickname: string;
  isAdmin: boolean;
  isGameIniciated: boolean = false;
  messages = [];
  count: number = 0;
  players; 
  mycards;
  turn;

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
      if (res.success) {
        const smsroom = {
          message: res.data.message,
          nickname: null,
        }
        this.messages.push(smsroom);
      }
    })

    this.socketWebService.outChat.subscribe(res => {
      if (res){
        const sms = {
          message: res.data.message,
          nickname: res.data.nickname,
        }
        this.messages.push(sms);
      }
      
    })

    this.socketWebService.outStartRoom.subscribe(res => {
      if (res.success) {
        this.players = res.data.players;
        this.mycards = this.players.find((player) => player.name == this.nickname).cards;
        
        this.mycards.forEach( card => {
          card.img = './assets/img/cards/' + card.img + '.svg'
        });
        
      } else {
        //TODO mostrar mensaje de error
      }
    })


    this.socketWebService.outTakeCard.subscribe(res => {
      console.log(res);
      if (res.success) {
        this.players = res.data.players;
        this.mycards = this.players.find((player) => player.name == this.nickname).cards;
        this.mycards.forEach( card => {
          card.img = './assets/img/cards/' + card.img + '.svg'
        });
        
      } else {
        //TODO mostrar mensaje de error
      }
    })

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomid = params.get('id');
      this.nickname = params.get('nickname');
      if (this.count == 0) {
        this.isAdmin = params.get('admin') == 'admin';
        this.count = 1;
      }
    });
  }

  addcard() {

    const addc = {
      type: 'takeCard',
      data: {
        roomId: this.roomid,
        nickname: this.nickname
      },
    };

    console.log('addc',addc)
    this.socketWebService.takeCard(addc); 
  }

  start() {
     
    const startr = {
      type: 'startRoom',
      data: {
        roomId: this.roomid,
        nickname: this.nickname
      },
    };

    this.isGameIniciated = true;     
    console.log('startr',startr)
    this.socketWebService.startRoom(startr); 
  }

  sendChat() {
    if (this.message != '') {
      const message = {
        type: 'chatRoom',
        data: {
          roomId: this.roomid,
          nickname: this.nickname,
          message: this.message
        },
      };
      this.message = ''
      this.socketWebService.chatSend(message); 
    }
  }
}
