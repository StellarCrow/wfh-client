import {Injectable} from '@angular/core';
import {IUser} from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  public currentUser: IUser;
  public roomCode: string;
  public users: string[];

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
    return this.currentUser ? this.currentUser.firstName : JSON.parse(localStorage.getItem('firstName'));
  }

  public setRoomCode(code: string): void {
    this.roomCode = code;
  }

  public getRoomCode(): string {
    return this.roomCode;
  }

  public getRoomsUsers(): string[] {
    return this.users;
  }

  public setRoomsUsers(usersList: string[]): void {
    this.users = [...usersList];
  }
}
