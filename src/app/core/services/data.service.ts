import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUrl} from '../../../environments/environment';
import {IAvatarUploadResponse} from '../../shared/interfaces/iavatar-upload-response';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  public uploadAvatar(id, file): Observable<IAvatarUploadResponse> {
    const url = apiUrl + `/users/${id}/avatar`;
    const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
    return this.http.post<IAvatarUploadResponse>(url, file, { headers });
  }


}
