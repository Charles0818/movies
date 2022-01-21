import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { Logger } from '@nestjs/common';

const AppLogger = new Logger();
@Catch(HttpException)
export class ErrorResponse implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: any = ctx.getResponse<Response>();
    const theresponse: any = exception.getResponse();
    // logdna.catastrophic(theresponse, options);
    AppLogger.error(
      `(LOGS) Error - ${
        theresponse.message
      } statusCode : ${exception.getStatus()}`,
    );
    if (exception.getStatus() == 400) {
      if (Array.isArray(theresponse.message)) {
        return response.status(422).json({
          status: 'error',
          message: 'Bad input data',
          error: theresponse.message,
        });
      }

      return response.status(400).json({
        status: 'error',
        message: theresponse.message,
      });
    } else {
      return response.status(exception.getStatus()).json({
        status: 'error',
        message: theresponse.message,
      });
    }
  }
}
