import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {apiUrl} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {IServerResponse} from '../../shared/interfaces/iserver-response';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  public uploadAvatar(id, file): Observable<object> {
    const url = apiUrl + `/users/${id}/avatar`;
    const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
    return this.http.post(url, file, { headers });
  }


}
