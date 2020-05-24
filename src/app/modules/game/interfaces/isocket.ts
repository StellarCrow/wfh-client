export interface ISocket {
  answer: string;
  payload: ISocketPayload;
}

export interface ISocketPayload {
  [key: string]: string;
}
