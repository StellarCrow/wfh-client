import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameViewService {
  private readonly _currentView = new BehaviorSubject<string>('');
  readonly currentView$ = this._currentView.asObservable();

  get currentView(): string {
    return this._currentView.getValue();
  }

  set currentView(view: string) {
    this._currentView.next(view);
  }

  setCurrentView(view: string): void {
    // TODO: reset current timer when moving to the next view
    this.currentView = view;
  }

  constructor() {
  }
}
