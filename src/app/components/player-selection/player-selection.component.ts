import { Component } from '@angular/core';
import { WinnerService } from '../../services/winner.service';

@Component({
  selector: 'app-player-selection',
  standalone: true,
  templateUrl: './player-selection.component.html',
  styleUrls: ['./player-selection.component.css']
})
export class PlayerSelectionComponent {

  constructor(private winnerService: WinnerService) { }

  movePlayer(option: string) {
    this.winnerService.startAnimation(option);
  }

}
