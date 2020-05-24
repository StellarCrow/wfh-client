import {Injectable} from '@angular/core';
import {IUser} from '../../shared/interfaces/user';

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

  public getUserName(): string {
    return this.currentUser.firstName;
  }

  public setRoomCode(code: string): void {
    this.roomCode = code;
  }

  public getRoomCode(): string {
    return this.roomCode;
  }
}
