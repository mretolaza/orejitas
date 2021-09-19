import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() { }

    model = {
        left: true,
        middle: false,
        right: false
    };

    initCssClases = () => Array.apply(null, {length: 5}).map(Number.call, () => 'page-item');

    buttons: boolean = true;

    isEnter: boolean = true;

    indexPlayer: number = 0;

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
        this.roomCreateForm.patchValue({players: this.indexPlayer + 3})
        this.classes = this.initCssClases();
        this.classes[this.indexPlayer] = 'page-item active';
    }

    backreturn = () => this.buttons = true;


    get listnumberplayers(): number[] {
        return [3, 4, 5, 6, 7]
    } 

    createRoom() {
        console.log(this.roomCreateForm)

        // this.router.navigate(['landing'])
    }

    enterRoom(){
        if((this.roomEnterForm.controls.id.value>99999) && (this.roomEnterForm.controls.id.value<1000000)){
            console.log(this.roomEnterForm)

        } else {
            console.log("Tu madre")
        }

        // this.router.navigate(['landing'])
    }

    focus;
    focus1;
    
}
