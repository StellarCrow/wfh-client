import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../../shared/interfaces/user';
import {apiUrl} from '../../../environments/environment';
import {ILoginResponse} from '../../shared/interfaces/i-login-response';
import {IRegisterResponse} from '../../shared/interfaces/iregister-response';
import {DataStoreService} from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private dataStoreService: DataStoreService) {
  }


  public registerUser(user: IUser): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>(`${apiUrl}/auth/register`, user);
  }

  public loginUser(email, password): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${apiUrl}/auth/login`, { email, password });
  }

  public googleLogin(user: Omit<IUser, 'password'>): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${apiUrl}/auth/google`, user);
  }

  public eLogout() {
    localStorage.removeItem('token');
    this.dataStoreService.removeCurrentUser();
  }
}
