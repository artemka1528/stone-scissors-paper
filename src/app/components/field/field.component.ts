import { Component, OnInit } from '@angular/core';
import { PlayerSelectionComponent } from '../player-selection/player-selection.component';
import { WinnerComponent } from '../winner/winner.component';
import { Subscription } from 'rxjs';
import { WinnerService } from '../../services/winner.service';
import { ResetComponent } from '../reset/reset.component';
import { SelectOptionComponent } from '../select-option/select-option.component';


interface IReceivedData {
  checkBot: number
  checkPlayer: number
}
@Component({
  selector: 'app-field',
  standalone: true,
  imports: [PlayerSelectionComponent, WinnerComponent, ResetComponent, SelectOptionComponent],
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  receivedData: IReceivedData = {checkBot:this.winnerServices.checkBot,checkPlayer: this.winnerServices.checkPlayer};
  dataSubscription!: Subscription;
  constructor(private winnerServices: WinnerService) {
    this.dataSubscription = this.winnerServices.check$.subscribe((data) => {
      this.receivedData = data;
    })
  }

  ngOnInit() {
  }
}
