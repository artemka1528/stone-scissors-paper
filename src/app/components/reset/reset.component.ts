import { Component, OnInit } from '@angular/core';
import { WinnerService } from '../../services/winner.service';


@Component({
  selector: 'app-reset',
  standalone: true,
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
  
})
export class ResetComponent implements OnInit {
  constructor(private winnerService: WinnerService) { }
  ngOnInit() {
  }
  
  reset() {
    this.winnerService.reset()
  }
  
}
