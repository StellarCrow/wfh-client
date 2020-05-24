import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {

  }

}
