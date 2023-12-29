import { Component, OnInit } from '@angular/core';
import { WinnerService } from '../../services/winner.service';
import { Subscription } from 'rxjs';
import { trigger, style, animate, transition, keyframes, } from '@angular/animations';
@Component({
  selector: 'app-select-option',
  standalone: true,
  providers: [],
  templateUrl: './select-option.component.html',
  animations: [
    trigger('bot', [
      transition('open => closed', [
        animate("1s", keyframes([
          style({ transform: 'rotate(15deg)' }),
          style({ transform: 'rotate(0deg)' }),
          style({ transform: 'rotate(15deg)' }),
          style({ transform: 'rotate(0deg)' }),
          style({ transform: 'rotate(15deg)' }),
          style({ transform: 'rotate(0deg)' }),
        ]))
      ]),
    ]),
    trigger('player', [
      transition('open => closed', [
        animate("1s", keyframes([
          style({ transform: 'rotate(-15deg)' }),
          style({ transform: 'rotate(0deg)' }),
          style({ transform: 'rotate(-15deg)' }),
          style({ transform: 'rotate(0deg)' }),
          style({ transform: 'rotate(-15deg)' }),
          style({ transform: 'rotate(0deg)' }),
        ]))
      ]),
    ]),
  ]
})
export class SelectOptionComponent implements OnInit {
  srcImgPlayer: string = '../../../assets/images/камень-игрок.svg';
  srcImgBot: string = '../../../assets/images/камень.svg';
  ImgPlayer: string = '';
  ImgBot: string = '';
  imgSubscription!: Subscription;
  isOpen = true;
  constructor(private winnerServices: WinnerService) {
    this.imgSubscription = this.winnerServices.imgUrl$.subscribe((data) => {
      if (!this.isOpen) {
        this.srcImgBot = `../../../assets/images/${data.bot}.svg`
        this.srcImgPlayer = `../../../assets/images/${data.movePlayer}-игрок.svg`
      } else {
        this.ImgBot = `../../../assets/images/${data.bot}.svg`
        this.ImgPlayer = `../../../assets/images/${data.movePlayer}-игрок.svg`
      }
      this.isOpen = !this.isOpen;
    })
  }
  
  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.imgSubscription.unsubscribe();
  }
  animationDone() {
    if (!this.isOpen) {
      this.srcImgPlayer = this.ImgPlayer
      this.srcImgBot = this.ImgBot
      this.winnerServices.getWinner()
    }
  }
}
