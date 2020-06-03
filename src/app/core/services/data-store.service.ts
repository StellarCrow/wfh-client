import {Injectable} from '@angular/core';
import {IUser} from '../../shared/interfaces/user';
import {IPlayer} from '../../shared/interfaces/iplayer';
import {Observable, Subject} from 'rxjs';
import {GameViewService} from '../../modules/game/services/game-view.service';
import {DONE} from '../../modules/game/constants/game-views';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  public currentUser: IUser;
  public roomCode: string;
  public users: IPlayer[];
  public loadedUsers: string[] = [];
  public finishedUsers: string[] = [];
  public gameStage: Subject<string> = new Subject();


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

  public getRoomsUsers(): IPlayer[] {
    return this.users;
  }

  public getFinishedUsers(): string[] {
    return this.finishedUsers;
  }

  public setFinishedUser(username): void {
    this.finishedUsers.push(username);
  }

  public clearFinishedUsers(): void {
    this.finishedUsers.splice(0, this.finishedUsers.length);
  }

  public setRoomsUsers(usersList: IPlayer[]): void {
    this.users = [...usersList];
  }

  public getLoadedUsers(): string[] {
    return this.loadedUsers;
  }

  public setLoadedUsers(user: string): void {
    this.loadedUsers.push(user);
  }

  public getGameStage(): Observable<string> {
    return this.gameStage.asObservable();
  }

  public setGameStage(state): void {
    this.gameStage.next(state);
  }

  public userIsLast(array): boolean {
    const userIsLast = this.getUserName() === array.slice().pop();
    const allUsersFinished = array.length === this.users.length;
    return allUsersFinished && userIsLast;
  }
}
