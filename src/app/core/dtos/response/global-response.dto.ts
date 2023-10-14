import { ApiProperty } from '@nestjs/swagger';

export class ResponseFormat<T> {
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
  data: T;
}
export class HttpRestApiResponse {
  @ApiProperty({ type: 'boolean' })
  public isArray: boolean;
  @ApiProperty({ type: 'string' })
  public path: string;
  @ApiProperty({ type: 'string' })
  public duration: string;
  @ApiProperty({ type: 'string' })
  public method: string;
  @ApiProperty({ type: 'object' })
  public data: unknown;
}
