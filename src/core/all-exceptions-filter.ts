import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CustomHttpExceptionResponse,
  HttpExceptionResponseInterface,
} from './models/http-exception-response-interface';
import * as fs from 'fs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      errorMessage =
        (errorResponse as HttpExceptionResponseInterface).error ||
        exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Critical internal server error occurred!';
    }
    const errorResponse = this.getErrorResponse(status, errorMessage, request);
    const errorLog: string = this.getErrorLog(
      errorResponse,
      request,
      exception,
    );
    this.writeErrorLogToFile(errorLog);
    response.status(status).json(errorResponse);
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ): CustomHttpExceptionResponse => ({
    statusCode: status,
    error: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });

  private getErrorLog = (
    errorResponse: CustomHttpExceptionResponse,
    request: Request,
    exception: unknown,
  ): string => {
    const { statusCode, error } = errorResponse;
    const { method, url } = request;
    const errorLog = `Response code: ${statusCode} - Method: ${method} - URL: ${url}\n\n
    ${JSON.stringify(errorResponse)}\n\n
    User: ${JSON.stringify(request.user ?? 'Not signed in')}\n\n
    ${exception instanceof HttpException ? exception.stack : error}\n\n`;
    console.log('Is logging...', errorLog);
    return errorLog;
  };

  private writeErrorLogToFile = (errorLog: string): void => {
    fs.appendFile(
      'error.log',
      errorLog,
      {
        encoding: 'utf8',
      },
      (err) => {
        if (err) throw err;
      },
    );
  };
}
