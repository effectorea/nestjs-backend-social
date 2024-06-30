export interface HttpExceptionResponseInterface {
  statusCode: number;
  error: string;
}

export interface CustomHttpExceptionResponse
  extends HttpExceptionResponseInterface {
  path: string;
  method: string;
  timeStamp: Date;
}
