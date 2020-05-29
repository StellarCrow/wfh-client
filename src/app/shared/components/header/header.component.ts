import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../../core/services/auth.service';
import {IUser} from '../../interfaces/user';
import {DataStoreService} from '../../../core/services/data-store.service';
import {LocalStorageService} from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public currentUser: IUser;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dataStoreService: DataStoreService,
    private localStorageService: LocalStorageService) {


  }

  ngOnInit(): void {
    this.currentUser = this.localStorageService.getItem('user');
  }

  logout() {
    this.authService.eLogout();
    this.router.navigate(['/']);
  }


}
