import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MongoError } from 'mongodb';
import { Request, Response } from 'express';
@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.code as number;

    switch (status) {
      case 11000:
        response.status(400).json({
          statusCode: 400,
          timestamp: new Date().toISOString(),
          // path: request.url,
          error: 'Bad Request',
          message: 'Email is already in use',
        });
    }
  }
}
