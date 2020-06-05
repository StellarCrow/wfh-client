import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public getItem(key: string): any {
    const itemString = localStorage.getItem(key);
    try {
      const item = JSON.parse(itemString);
      return item;
    } catch (error) {
      return null;
    }
  }

  public setItem(key: string, value: object): void {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      return null;
    }
  }
}
