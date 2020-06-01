import {IServerResponse} from './iserver-response';

export interface IAvatarUploadResponse extends IServerResponse {
  payload: {
    avatar: string
  };
}
