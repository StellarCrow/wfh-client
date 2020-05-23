import {Injectable} from '@angular/core';
import {IUser} from '../../shared/interfaces/user';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  public currentUser: IUser;
  public roomCode;

  constructor() {
  }

  public getCurrentUser(): IUser {
    return this.currentUser;
  }

  public setCurrentUser(user: IUser) {
    this.currentUser = user;
  }

  public removeCurrentUser(): void {
    this.currentUser = null;
  }
}
