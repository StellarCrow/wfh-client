import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  subscription: Subscription;
  duration: number = 75;

  constructor() { }

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(t => {
      this.startCount();
    });
  }

  startCount(): void {
    this.duration -= 1;
    if (this.duration < 1) {
      this.subscription.unsubscribe();
    }
  }
}
