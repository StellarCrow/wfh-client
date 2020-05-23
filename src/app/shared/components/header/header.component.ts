import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../../core/services/auth.service';
import {IUser} from '../../interfaces/user';
import {DataStoreService} from '../../../core/services/data-store.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public currentUser: IUser;
  private notifier = new Subject();

  constructor(
    private router: Router,
    private authService: AuthService,
    private dataStoreService: DataStoreService) {

    this.dataStoreService.getCurrentUser().pipe(takeUntil(this.notifier)).subscribe((user: IUser) => (this.currentUser = user));
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.eLogout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

}
