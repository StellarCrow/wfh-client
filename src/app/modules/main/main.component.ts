import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../core/services/notification.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private notificationService: NotificationService, private snackBar: MatSnackBar) {
    this.notificationService.notification$.subscribe((message) => {
      this.snackBar.open(message, 'Close', { duration: 2500, horizontalPosition: 'right' });
    });
  }

  ngOnInit(): void {
  }

}
