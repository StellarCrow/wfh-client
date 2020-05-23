import {IServerResponse} from './iserver-response';
import {IUser} from './user';

export interface ILoginResponse extends IServerResponse {
  payload: ILoginPayload;
}


interface ILoginPayload {
  userData: IUser;
  token: string;
}
