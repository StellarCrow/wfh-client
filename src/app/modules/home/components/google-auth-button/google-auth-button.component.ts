import {Component, NgZone, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/services/auth.service';
import {ILoginResponse} from '../../../../shared/interfaces/i-login-response';
import {AlertService} from '../../../../core/services/alert.service';
import {Router} from '@angular/router';
import {DataStoreService} from '../../../../core/services/data-store.service';
import {CLIENT_ID} from '../../../../../environments/environment';

@Component({
  selector: 'app-google-auth-button',
  templateUrl: './google-auth-button.component.html',
  styleUrls: ['./google-auth-button.component.scss']
})
export class GoogleAuthButtonComponent implements OnInit {
  private gapiSetup: boolean;
  private authInstance: gapi.auth2.GoogleAuth;
  private user: gapi.auth2.GoogleUser;

  constructor(private authService: AuthService,
              private alertService: AlertService,
              private router: Router,
              private dataStore: DataStoreService,
              private ngZone: NgZone
  ) {
  }

  async ngOnInit(): Promise<void> {
    if (await this.checkIfUserAuthenticated()) {
      this.user = this.authInstance.currentUser.get();
    }
  }

  public async authenticate(): Promise<gapi.auth2.GoogleUser> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return new Promise(async () => {
      await this.authInstance.signIn().then(
        user => {
          this.user = user;
          this.sendUserData();
        },
        error => console.log(error)
      );
    });
  }

  private async checkIfUserAuthenticated(): Promise<boolean> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    return this.authInstance.isSignedIn.get();
  }

  private async initGoogleAuth(): Promise<void> {
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    return pload.then(async () => {
      await gapi.auth2.init({ client_id: CLIENT_ID })
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  private sendUserData(): void {
    const user = this.user.getBasicProfile();
    const userData = {
      firstName: user.getGivenName(),
      lastName: user.getFamilyName(),
      email: user.getEmail(),
      avatar: user.getImageUrl()
    };

    this.authService.googleLogin(userData).subscribe((data: ILoginResponse) => {
        if (!data.success) {
          return this.alertService.error(data.error.message);
        }
        this.setItemsToLocalStorage(data);
        this.dataStore.setCurrentUser(data.payload.userData);
        this.ngZone.run(() => this.router.navigate(['main/welcome']));
      },
      (error) => {
        this.alertService.error(error);
        console.log(error);
      },
    );
  }

  private setItemsToLocalStorage(data: ILoginResponse) {
    const user = data.payload.userData;
    if (user && user.password) {
      delete user.password;
    }
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('firstName', JSON.stringify(data.payload.userData.firstName));
    localStorage.setItem('token', JSON.stringify(data.payload.token));
  }

}
