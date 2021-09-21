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
  url = '';
  roomid: string;
  nickname: string;
  isAdmin: boolean;
  showed: boolean = false;
  errorMessage: string = '';
  isGameIniciated: boolean = false;
  messages = [];
  count: number = 0;
  players; 
  otherPlayers;
  mycards;
  turn;
  tableCard;
  select:boolean = false;
  change:boolean = false;
    
  selectedCard;
  selectedChangeCard;
  imgSelected = './assets/img/cards/rev.svg';
  imgSelectedChange = './assets/img/cards/rev.svg';

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
        this.otherPlayers = res.data.players.filter( p => p.name != this.nickname)
        this.mycards = this.players.find((player) => player.name == this.nickname).cards;
        
        this.mycards.forEach( card => {
          card.img = './assets/img/cards/' + card.img + '.svg'
        });

        this.turn = this.players.find((player) => player.turn == true)
        
        const sms = {
          message: 'Play now!!! Turn of ' + this.turn.name,
          nickname: null,
        }
        this.messages.push(sms);

        // console.log('this.players---->', this.players)
        // console.log('this.mycards---->', this.mycards)
        
      } else {
        this.errorMessage = 'Error al tratar de iniciar el juego';
        this.showed = true;
      }
    })


    this.socketWebService.outTakeCard.subscribe(res => {
      console.log(res);
      if (res.success) {
        this.players = res.data.players;
        this.otherPlayers = res.data.players.filter( p => p.name != this.nickname)
        this.mycards = this.players.find((player) => player.name == this.nickname).cards;
        this.mycards.forEach( card => {
          card.img = './assets/img/cards/' + card.img + '.svg'
        });

        console.log('this.players---->', this.players)
        console.log('this.mycards---->', this.mycards)
        
      } /*else {
        this.errorMessage = 'Error al sacar una carta del mazo';
        this.showed = true;
      }*/
    })

    this.socketWebService.outMakeMove.subscribe(res => {
      console.log(res);
      if (res.success) {
        this.players = res.data.players;
        this.otherPlayers = res.data.players.filter( p => p.name != this.nickname)
        this.mycards = this.players.find((player) => player.name == this.nickname).cards;
        
        this.mycards.forEach( card => {
          card.img = './assets/img/cards/' + card.img + '.svg'
        });

        this.tableCard = res.data.tablecard
        
        console.log('this.tableCard---->',this.tableCard)
        console.log('this.players---->', this.players)
        console.log('this.mycards---->', this.mycards)  
        
      } /*else {
        this.errorMessage = 'Error al sacar una carta del mazo';
        this.showed = true;
      }*/
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

  makeMove() {

    if (this.select) {
      const  move = {
        type:'makeMove',
        data:{
          roomId: this.roomid,
          nickname: this.nickname,
          card: {
            num: this.selectedCard.num, 
            fig: this.selectedCard.fig,
            img: this.selectedCard.fig + '_' + this.selectedCard.num
          },
          change: this.change,
          change_card: {
            num: this.change ? this.selectedChangeCard.num : null, 
            fig: this.change ? this.selectedChangeCard.fig : null,
            img: this.change ? this.selectedChangeCard.fig + '_' + this.selectedChangeCard.num : null
          }
        }
      }

      console.log('move', move);
      this.socketWebService.makeMove(move); 
      this.removeImgSelectedChange();
    }
    
  }

  selectCard(carta:any, img) {
    this.select = true

    // TODO validar que la carta sea mayor a la carta sobre la mesa

    this.imgSelected = img;
    this.selectedCard = carta;
    console.log('mover carta', this.selectedCard);
  }

  changeCard(carta:any, img) {
    this.change = true

    // TODO validar que la carta sea de color diferente a la carta sobre la mesa

    this.imgSelectedChange = img;
    this.selectedChangeCard = carta;
    console.log('mover carta', this.selectedChangeCard);
  }

  removeImgSelectedChange() {
    this.select = false;
    this.change = false;
    this.imgSelected = './assets/img/cards/rev.svg';
    this.imgSelectedChange = './assets/img/cards/rev.svg';
    
  }

  close = () => this.showed = false;
}
