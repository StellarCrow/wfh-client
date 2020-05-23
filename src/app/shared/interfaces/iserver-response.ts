export interface IServerResponse {
  success: boolean;
  status?: string;
  error?: IError;
}

interface IError {
  status: string;
  message: string;
}
