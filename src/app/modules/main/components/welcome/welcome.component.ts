import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../core/services/auth.service';
import {IUser} from '../../../../shared/interfaces/user';
import {DataStoreService} from '../../../../core/services/data-store.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnDestroy {
  private currentUser: IUser;
  private notifier = new Subject();

  constructor(
    private router: Router,
    private authService: AuthService,
    private dataStoreService: DataStoreService
  ) {

    this.dataStoreService.getCurrentUser().pipe(takeUntil(this.notifier)).subscribe(user => this.currentUser = user);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
