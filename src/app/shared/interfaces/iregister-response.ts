import {IServerResponse} from './iserver-response';

export interface IRegisterResponse extends IServerResponse {
  payload: IRegisterPayload;
}
interface IRegisterPayload {
  payload: null;
}
