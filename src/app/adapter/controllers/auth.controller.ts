import { Controller, Param, Post, Body, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  AuthLoginResponseDto,
  AuthRequestDto,
  EmailParamDto,
  RefreshTokenResponseDto,
  ResetPasswordDto,
  ResetPasswordResponseDto,
  ResetPasswordResultDto,
  UserLoginResponseDto,
  UserLogoutResponseDto,
  VerifyTokenDto,
  VerifyTokenResponseDto,
  VerifyTokenResultDto,
} from '../../core/dtos/auth';
import { AuthUseCases } from '../../use-cases/auth/auth.use-case';
import { RefreshTokenGuard } from '../guards/refresh_token.guard';
import { AccessTokenGuard } from '../guards/access_token.guard';
import { Public } from '../decorators/public.decorator';
import { ResponseCode } from '../../constants';
import { GlobalResponseError } from '../../core/dtos/error/global-response-error.dto';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private authUseCases: AuthUseCases) {}

  // @Throttle(4, 20)
  @Public()
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Login to System',
    description: 'user login api returns access token',
  })
  @ApiOkResponse({
    type: UserLoginResponseDto,
    description: 'user  has been login successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error occurred',
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  @Post('/login')
  public async Login(
    @Body() body: AuthRequestDto,
  ): Promise<AuthLoginResponseDto> {
    return await this.authUseCases.validateUserByPassword(body);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('authorization')
  @ApiConsumes('application/json')
  @ApiOkResponse({
    type: UserLogoutResponseDto,
    description: 'Logout Succeed Result',
  })
  @ApiUnauthorizedResponse({
    description: ResponseCode.UNAUTHORIZED_ERROR.message,
  })
  @ApiInternalServerErrorResponse({
    description: ResponseCode.INTERNAL_SERVER_ERROR.message,
  })
  @Post('/logout')
  public async Logout(@Req() req: any) {
    await this.authUseCases.logout(req.user);
    return null;
  }

  @UseGuards(RefreshTokenGuard)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Refresh Token Service',
    description: 'Refresh Token Service',
  })
  @ApiOkResponse({
    type: RefreshTokenResponseDto,
    description: 'Refresh Token Executed Successfully',
  })
  @ApiUnauthorizedResponse({
    description: ResponseCode.UNAUTHORIZED_ERROR.message,
  })
  @ApiInternalServerErrorResponse({
    description: ResponseCode.INTERNAL_SERVER_ERROR.message,
  })
  @Post('/refresh')
  public async RefreshToken(@Req() req: any): Promise<AuthLoginResponseDto> {
    return await this.authUseCases.refreshToken(req.user);
  }

  @ApiOperation({
    summary: 'Send Forgot Password Token',
    description: 'Send Forgot Password Token',
  })
  @ApiOkResponse({
    type: ResetPasswordResponseDto,
    description: 'Status of Mail Send or not',
  })
  @ApiResponse({
    type: GlobalResponseError,
    description: 'Global Error Response Model',
  })
  @ApiNotFoundResponse({
    description: ResponseCode.ENTITY_NOT_FOUND_ERROR.message,
  })
  @ApiBadRequestResponse({
    description: ResponseCode.BAD_REQUEST_ERROR.message,
  })
  @ApiInternalServerErrorResponse({
    description: ResponseCode.INTERNAL_SERVER_ERROR.message,
  })
  @Post('/forgotPassword/:email')
  public async ForgotPassword(
    @Param() param: EmailParamDto,
  ): Promise<ResetPasswordResultDto> {
    return await this.authUseCases.sendEmailForgotPassword(param.email);
  }

  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Reset Password with Token',
    description: 'Reset Password with Token',
  })
  @ApiOkResponse({
    type: ResetPasswordResponseDto,
    description: 'Updated user details',
  })
  @ApiResponse({
    type: GlobalResponseError,
    description: 'Global Error Response Model',
  })
  @ApiNotFoundResponse({
    description: ResponseCode.ENTITY_NOT_FOUND_ERROR.message,
  })
  @ApiInternalServerErrorResponse({
    description: ResponseCode.INTERNAL_SERVER_ERROR.message,
  })
  @Post('/resetPassword')
  public async ResetPassword(
    @Body() body: ResetPasswordDto,
  ): Promise<ResetPasswordResultDto> {
    return await this.authUseCases.resetPassword(body);
  }
}
