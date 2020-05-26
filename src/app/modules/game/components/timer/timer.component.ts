import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  duration: number = 75;

  constructor() { }

  ngOnInit(): void {
    this.startCount();
  }

  startCount(): void {
    const countDownTimer = setInterval(() => {
      this.duration -= 1;
      if (this.duration < 1) {
        clearInterval(countDownTimer);
      }
    }, 1000);
  }
}
