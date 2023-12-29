import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponseGenerationService {

  option = ['камень', 'ножницы', 'бумага']
  generation() {
    return this.option[Math.floor(Math.random() * 3)];
  }
}
