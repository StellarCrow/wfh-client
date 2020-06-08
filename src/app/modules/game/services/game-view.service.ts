import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameViewService {
  private readonly _currentView = new BehaviorSubject<string>('');
  readonly currentView$ = this._currentView.asObservable();

  get getCurrentView(): string {
    return this._currentView.getValue();
  }

  set setCurrentView(view: string) {
    this._currentView.next(view);
  }

  constructor() {
  }
}
