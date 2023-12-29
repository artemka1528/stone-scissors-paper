import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WinnerService } from '../../services/winner.service';

@Component({
  selector: 'app-winner',
  standalone: true,
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnDestroy {
  receivedData: string = '';
  dataSubscription!: Subscription;
  constructor(private winnerServices: WinnerService) {
    this.dataSubscription = this.winnerServices.data$.subscribe((data) => {
      this.receivedData = data;
    })
  }
  continue(): void {
    this.winnerServices.continue()
  }
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

}
