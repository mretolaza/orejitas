import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { SocketWebService } from '../service/socket-web.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  closeResult;

  constructor(
    private router: Router,
    private socketWebService: SocketWebService,
    private modalService: NgbModal
  ) {

    this.socketWebService.outCreateRoom.subscribe(res => {
      if (!res.success) {
        this.errorMessage = 'Error al crear la sala';
        this.showed = true;
      } else {
        console.log(res.data);
        this.router.navigate([`landing/${res.data.createdId}/${this.nickname}/${this.admin}`])
      }
    })

    this.socketWebService.outjoinRoom.subscribe(res => {
      if (!res.success) {
        this.errorMessage = 'Error al unirse a la sala';
        this.showed = true;
      } else {
        console.log(res.data)
        this.router.navigate([`landing/${res.data.roomid}/${this.nickname}/${this.admin}`])
      }
    })
  }
  ngOnInit(): void { }

  model = {
    left: true,
    middle: false,
    right: false
  };

  initCssClases = () => Array.apply(null, { length: 5 }).map(Number.call, () => 'page-item');

  buttons: boolean = true;

  isEnter: boolean = true;

  showed: boolean = false;

  indexPlayer: number = null;

  errorMessage: string = '';

  nickname: string = '';

  admin: string = '';

  roomCreateForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    players: new FormControl(''),
    ownerNickName: new FormControl('')
  });

  roomEnterForm = new FormGroup({
    id: new FormControl(''),
    playerNickName: new FormControl('')
  });

  classes: string[] = this.initCssClases()

  goToForm(isEnter: boolean): void {
    this.buttons = false;
    this.isEnter = isEnter;
  }

  setPreviousNum(): void {
    if ((this.indexPlayer == null) || (this.indexPlayer == 0)) {
      this.setActiveNum(4)
    } else {
      this.setActiveNum(this.indexPlayer - 1);
    }
  }

  setNextNum(): void {
    if ((this.indexPlayer == null) || (this.indexPlayer == 4)) {
      this.setActiveNum(0)
    } else {
      this.setActiveNum(this.indexPlayer + 1);
    }
  }

  setActiveNum(index: number): void {
    this.indexPlayer = index;
    this.roomCreateForm.patchValue({ players: this.indexPlayer + 3 })
    this.classes = this.initCssClases();
    this.classes[this.indexPlayer] = 'page-item active';
  }

  backreturn = () => this.buttons = true;


  get listnumberplayers(): number[] {
    return [3, 4, 5, 6, 7]
  }

  createRoom() {
    if (this.roomCreateForm.valid && this.indexPlayer != null) {
      this.nickname = this.roomCreateForm.controls.ownerNickName.value;
      const roomInfo = {
        type: 'createRoom',
        data: {
          name: this.roomCreateForm.controls.name.value,
          description: this.roomCreateForm.controls.description.value,
          maxPlayers: this.roomCreateForm.controls.players.value,
          userNickname: this.roomCreateForm.controls.ownerNickName.value,
        },
      }
      this.admin = 'admin'
      this.socketWebService.createRoom(roomInfo);
    } else {
      this.errorMessage = 'Por favor llene todos los campos';
      this.showed = true;
    }
  }

  enterRoom() {
    if (this.roomEnterForm.valid) {
      this.nickname = this.roomEnterForm.controls.playerNickName.value;
      const roomInfo = {
        type: 'joinRoom',
        data: {
          roomId: this.roomEnterForm.controls.id.value,
          nickname: this.roomEnterForm.controls.playerNickName.value,
        },
      };
      this.admin = 'no-admin'
      this.socketWebService.joinRoom(roomInfo);

    } else {
      this.errorMessage = 'Por favor llene todos los campos';
      this.showed = true;
    }
  }

  close = () => this.showed = false;

  focus;
  focus1;

  faq(content) {
    this.modalService.open(content, { windowClass: 'modal-mini', size: 'lg', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

}
