import {Injectable} from '@angular/core';
import {IUser} from '../../shared/interfaces/user';
import {IPlayer} from '../../shared/interfaces/iplayer';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  public currentUser: IUser;
  public roomCode: string;
  public users: IPlayer[];
  private usersSubject = new BehaviorSubject<IPlayer[]>([]);
  public users$ = this.usersSubject.asObservable();
  public loadedUsers: string[] = [];
  public finishedUsers: string[] = [];
  public gameStage: Subject<string> = new Subject();
  public timerState = new BehaviorSubject(false);


  constructor() {
  }

  public getCurrentUser(): IUser {
    return this.currentUser;
  }

  public getCurrentPlayer(socketId: string): IPlayer {
    return this.users.find(user => user.socketId === socketId);
  }

  public getPlayersWithoutMe(socketId: string): IPlayer[] {
    return this.users.filter(user => user.socketId !== socketId);
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
    this.usersSubject.next(usersList);
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

  public getTimerState(): Observable<boolean> {
    return this.timerState;
  }

  public setTimerState(state: boolean): void {
    this.timerState.next(state);
  }

  public clearGameSessionData(): void {
    this.timerState.next(false);
    this.users.splice(0, this.users.length);
    this.loadedUsers.splice(0, this.loadedUsers.length);
    this.finishedUsers.splice(0, this.finishedUsers.length);
  }
}
