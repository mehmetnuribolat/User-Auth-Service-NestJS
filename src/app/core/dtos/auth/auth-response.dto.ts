import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { HttpRestApiResponse } from '../response/global-response.dto';

export class AuthLoginResponseDto {
  @ApiResponseProperty({
    example: 'da9b9f51-23b8-4642-97f7-52537b3cf53b',
    format: 'v4',
  })
  public userId: string;

  @ApiResponseProperty({
    example: 'user@gmail.com',
  })
  public email: string;

  @ApiResponseProperty({
    example: 'euuuuuuuwscdswcscfdes.fwdesfwdwfcews.qwdewefdwefw',
  })
  public access_token: string;

  @ApiResponseProperty({
    example: 'euuuuuuuwscdswcscfdes.fwdesfwdwfcews.qwdewefdwefw',
  })
  public refresh_token: string;
}

export class ResetPasswordResultDto {
  @ApiResponseProperty({
    example: 'true',
  })
  public status: boolean;
}

export class VerifyTokenResultDto {
  @ApiResponseProperty({
    example: 'admin',
  })
  public role: string;
  @ApiResponseProperty({
    example: 'test@gmail.com',
  })
  public email: string;
  @ApiResponseProperty({
    example: '1687938740',
  })
  public exp: number;
  @ApiResponseProperty({
    example: '1687938740',
  })
  public iat: number;
  @ApiResponseProperty({
    example: '6827c61854545454545-dsadsadsa-ddsadsa',
  })
  public userId: string;
}

export class VerifyTokenResponseDto extends HttpRestApiResponse {
  @ApiProperty({ type: ResetPasswordResultDto })
  public data: VerifyTokenResultDto;
}

export class ResetPasswordResponseDto extends HttpRestApiResponse {
  @ApiProperty({ type: ResetPasswordResultDto })
  public data: ResetPasswordResultDto;
}

export class UserLoginResponseDto extends HttpRestApiResponse {
  @ApiProperty({ type: AuthLoginResponseDto })
  public data: AuthLoginResponseDto;
}

export class UserLogoutResponseDto extends HttpRestApiResponse {
  @ApiProperty()
  public data: unknown;
}

export class RefreshTokenResponseDto extends HttpRestApiResponse {
  @ApiProperty({ type: AuthLoginResponseDto })
  public data: AuthLoginResponseDto;
}
