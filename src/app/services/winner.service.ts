import { Injectable } from '@angular/core';
import { ResponseGenerationService } from './response-generation.service';
import { Subject } from 'rxjs';

interface ITableWinner {
  [камень: string]: {
    [камень: string]: number
    'ножницы': number
    'бумага': number
  }
  'ножницы': {
    'камень': number
    'ножницы': number
    'бумага': number
  }
  'бумага': {
    'камень': number
    'ножницы': number
    'бумага': number
  }
}
interface IImgUrl {
  movePlayer: string
  bot: string
}
interface ICheck {
  checkPlayer: number
  checkBot: number
}
@Injectable({
  providedIn: 'root'
})
export class WinnerService {
  tableWinner: ITableWinner = {
    'камень': {
      'камень': 0,
      'ножницы': 1,
      'бумага': -1
    },
    'ножницы': {
      'камень': -1,
      'ножницы': 0,
      'бумага': 1
    },
    'бумага': {
      'камень': 1,
      'ножницы': -1,
      'бумага': 0
    }
  }
  checkPlayer: number = 0;
  checkBot: number = 0;

  checkSubject = new Subject<ICheck>();
  check$ = this.checkSubject.asObservable();

  winSubject = new Subject<string>();
  data$ = this.winSubject.asObservable();

  imgUrlSubject = new Subject<IImgUrl>();
  imgUrl$ = this.imgUrlSubject.asObservable();

  constructor(private responseGeneration: ResponseGenerationService) { }
  movePlayer: string = ''
  moveBot: string = ''
  winner: number = 0

  startAnimation(movePlayer: string) {
    this.moveBot = this.responseGeneration.generation()
    this.winner = this.tableWinner[movePlayer][this.moveBot]
    this.imgUrlSubject.next({ movePlayer, bot: this.moveBot })
  }
  getWinner() {
      if (this.winner == 1) {
        setTimeout(()=> {this.winSubject.next('Вы победили!')}, 500)
        this.checkPlayer++;
      } else if (this.winner == -1) {
        setTimeout(()=> {this.winSubject.next('Вы проиграли!')}, 500)
        this.checkBot++
      } else if (this.winner == 0) {
        setTimeout(()=> {this.winSubject.next('Ничья!')}, 500)
      }
  }
  continue() {
    this.winSubject.next('')
    this.imgUrlSubject.next({ movePlayer: 'камень', bot: 'камень' })
    this.checkSubject.next({ checkPlayer: this.checkPlayer, checkBot: this.checkBot });
  }
  reset() {
    this.checkPlayer = 0
    this.checkBot = 0
    this.checkSubject.next({ checkPlayer: this.checkPlayer, checkBot: this.checkBot });
  }
}
