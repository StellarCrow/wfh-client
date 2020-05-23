import {Injectable} from '@angular/core';
import {IUser} from '../../shared/interfaces/user';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  public currentUser: Subject<IUser> = new Subject<IUser>();
  public roomCode;

  constructor() {
  }

  public getCurrentUser(): Observable<IUser> {
    return this.currentUser.asObservable();
  }

  public setCurrentUser(user: IUser) {
    this.currentUser.next(user);
  }

  public removeCurrentUser(): void {
    this.currentUser.next(null);
  }
}
