import { ResponseCode } from '../../../constants';

export type Nullable<T> = T | null;

export class CoreApiResponseDto<TData> {
  public readonly code: number;

  public readonly message: string;

  public readonly timestamp: number;

  public readonly data: Nullable<TData>;

  private constructor(code: number, message: string, data?: TData) {
    this.code = code;
    this.message = message;
    this.data = data || null;
    this.timestamp = Date.now();
  }

  public static success<TData>(
    data?: TData,
    message?: string,
  ): CoreApiResponseDto<TData> {
    const resultCode: number = ResponseCode.SUCCESS.code;
    const resultMessage: string = message || ResponseCode.SUCCESS.message;

    return new CoreApiResponseDto(resultCode, resultMessage, data);
  }

  public static error<TData>(
    code?: number,
    message?: string,
    data?: TData,
  ): CoreApiResponseDto<TData> {
    const resultCode: number = code || ResponseCode.INTERNAL_SERVER_ERROR.code;
    const resultMessage: string =
      message || ResponseCode.INTERNAL_SERVER_ERROR.message;

    return new CoreApiResponseDto(resultCode, resultMessage, data);
  }
}
