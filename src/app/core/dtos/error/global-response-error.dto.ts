import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export interface IResponseError {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
}

export interface IError {
  message: string;
  error: string;
}
export class GlobalResponseError {
  @ApiProperty()
  public statusCode: number;
  @ApiProperty()
  public message: string;
  @ApiProperty()
  public error: string;
  @ApiProperty()
  public timestamp: string;
  @ApiProperty()
  public path: string;

  constructor(
    statusCode: number,
    message: string,
    error: string,
    request: string,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.timestamp = new Date().toISOString();
    this.path = request;
  }
}

// export const GlobalResponseError: (statusCode: number, message: string, error: string, request: string) => IResponseError = (
//     statusCode: number,
//     message: string,
//     error:string,
//     request: string
// ): IResponseError => {
//     return {
//         statusCode: statusCode,
//         message: message,
//         error: error,
//         timestamp: new Date().toISOString(),
//         path: request,
//     };
// };
