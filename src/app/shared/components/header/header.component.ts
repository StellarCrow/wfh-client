import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../../core/services/auth.service';
import {IUser} from '../../interfaces/user';
import {DataStoreService} from '../../../core/services/data-store.service';

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
    private dataStoreService: DataStoreService) {


  }

  ngOnInit(): void {
    this.currentUser = this.dataStoreService.getCurrentUser();
  }

  logout() {
    this.authService.eLogout();
    this.router.navigate(['/login']);
  }


}
