import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit() { }

  addcard() {

    if (this.c.length == 0)
      return;

    const card = this.c[0];

    this.cartas.push(card)

    this.c.shift();
    console.log(card)
  }

}
