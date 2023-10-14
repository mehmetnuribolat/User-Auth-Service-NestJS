import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  HttpVersionNotSupportedException,
} from '@nestjs/common';
import {
  GlobalResponseError,
  IError,
} from '../../core/dtos/error/global-response-error.dto';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm';
import { Request, Response } from 'express';
import { Exception } from 'handlebars';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request: any = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as IError)
        : { message: (exception as Error).message, error: null };

    this.logMessage(request, message, status, exception);
    response
      .status(status)
      .json(
        new GlobalResponseError(
          status,
          message.message,
          message.error,
          request.url,
        ),
      );
  }

  private logMessage(
    request: any,
    message: IError,
    status: number,
    exception: any,
  ) {
    if (status === 500) {
      //   this.logger.error(
      //     `End Request for ${request.path}`,
      //     `method=${request.method} status=${status} code_error=${
      //       message.code_error ? message.code_error : null
      //     } message=${message.message ? message.message : null}`,
      //     status >= 500 ? exception.stack : '',
      // )  ;
      console.log(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message.error ? message.error : null
        } message=${message.message ? message.message : null}`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      //   this.logger.warn(
      //     `End Request for ${request.path}`,
      //     `method=${request.method} status=${status} code_error=${
      //       message.code_error ? message.code_error : null
      //     } message=${message.message ? message.message : null}`,
      //   );
      console.log(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message.error ? message.error : null
        } message=${message.message ? message.message : null}`,
      );
    }
  }
}
