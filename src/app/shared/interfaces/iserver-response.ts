export interface IServerResponse {
  success: boolean;
  status?: string;
  error?: IError;
}

interface IError {
  status: number;
  message: string;
}
