import { Injectable } from '@nestjs/common/decorators';
import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import {
  IBcryptService,
  IDataServices,
  IJwtAuthPayload,
  IJwtAuthService,
} from '../../core/abstracts';
import {
  AuthLoginResponseDto,
  AuthRequestDto,
  ResetPasswordDto,
  ResetPasswordResultDto,
  VerifyTokenDto,
  VerifyTokenResultDto,
} from '../../core/dtos/auth';
import {
  IMailSenderService,
  MailSenderPayload,
} from '../../core/abstracts/mail-sender-service.abstract';
import { ConfigService } from '../../../config/config.service';
import { User } from '../../../app/core/entities';

@Injectable()
export class AuthUseCases {
  constructor(
    @InjectMapper() private readonly classMapper: Mapper,
    private readonly dataServices: IDataServices,
    private readonly jwtAuthServices: IJwtAuthService,
    private readonly bcryptServices: IBcryptService,
    private readonly mailSenderService: IMailSenderService,
    private readonly configService: ConfigService,
  ) {}

  async validateUserByPassword(
    payload: AuthRequestDto,
  ): Promise<AuthLoginResponseDto> {
    const { email, password } = payload;

    const user = await this.dataServices.users.getByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }

    if (user.is_active === false) {
      throw new BadRequestException('User does not have access permission');
    }

    let isPwMatch = false;
    isPwMatch = await this.bcryptServices.compare(password, user.password);
    if (isPwMatch) {
      const authPayload: IJwtAuthPayload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      };

      const authToken = await this.jwtAuthServices.createToken(authPayload);
      user.refresh_token = authToken.refresh_token;

      const updateRefreshTokenResult = await this.updateRefreshToken(user);

      const dataToReturn: AuthLoginResponseDto = {
        userId: authToken.userId,
        email: authToken.email,
        access_token: authToken.access_token,
        refresh_token: authToken.refresh_token,
      };
      return dataToReturn;
    } else {
      throw new NotFoundException(`Invalid Username or Password!`);
    }
  }

  public async updateRefreshToken(user: User) {
    if (user.refresh_token) {
      const hashedToken = await this.bcryptServices.hash(user.refresh_token);
      user.refresh_token = hashedToken;
      user.last_login_at = new Date();
    }
    return await this.dataServices.users.update(user._id, user);
  }

  public async validateJwtPayload(payload: JwtPayload): Promise<User> {
    return await this.dataServices.users.getById(payload.userId);
  }

  public async logout(user: User) {
    try {
      user.refresh_token = null;
      await this.updateRefreshToken(user);
    } catch (err) {
      throw new InternalServerErrorException('Error occured on logout process');
    }
  }

  async refreshToken(user: User): Promise<AuthLoginResponseDto> {
    const { refresh_token } = user;

    const accessData = await this.dataServices.users.getByEmail(user.email);
    if (!accessData) {
      throw new ForbiddenException();
    }
    const isMatchFound = await this.bcryptServices.compare(
      refresh_token,
      accessData.refresh_token,
    );

    if (!isMatchFound) {
      throw new ForbiddenException();
    }

    const authPayload: IJwtAuthPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: accessData.role,
    };

    const tokens = await this.jwtAuthServices.createToken(authPayload);
    accessData.refresh_token = tokens.refresh_token;

    const updateRefreshTokenResult = await this.updateRefreshToken(accessData);

    const dataToReturn: AuthLoginResponseDto = {
      userId: tokens.userId,
      email: tokens.email,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };

    return dataToReturn;
  }

  public async verifyAccessToken(
    token: VerifyTokenDto,
  ): Promise<VerifyTokenResultDto> {
    const result = await this.jwtAuthServices.checkToken(token.jwt_token);
    if (result == null) {
      throw new UnauthorizedException('Invalid Access Token');
    }

    return Object.assign(new VerifyTokenResultDto(), {
      ...result,
    });
  }

  public async resetPassword(
    resetPassword: ResetPasswordDto,
  ): Promise<ResetPasswordResultDto> {
    const user = await this.dataServices.users.getByEmail(resetPassword.email);
    if (!user || user.reset_password_token === null) {
      throw new ForbiddenException(
        'Invalid Reset Password Token, Please Recreate Token',
      );
    }
    const now = new Date();
    const dateDiff = now.getTime() - user.reset_password_expire.getTime();
    if (
      user.reset_password_token === resetPassword.password_token &&
      dateDiff < 0
    ) {
      const passHash = await this.bcryptServices.hash(
        resetPassword.new_password,
      );

      user.password = passHash;
      user.reset_password_expire = null;
      user.reset_password_token = null;

      const updatedUser = await this.dataServices.users.update(user._id, user);

      if (updatedUser) {
        return Object.assign(new ResetPasswordResultDto(), {
          status: true,
        });
      } else {
        throw new InternalServerErrorException(
          'Error Occured On Reset Password',
        );
      }
    } else {
      throw new BadRequestException('Invalid Password Reset Token');
    }
  }

  public async sendEmailForgotPassword(
    email: string,
  ): Promise<ResetPasswordResultDto> {
    const userData = await this.dataServices.users.getByEmail(email);
    if (!userData) {
      throw new NotFoundException('User Not Found');
    }

    const newResetPasswordToken = this.createForgotPasswordToken();
    userData.reset_password_token = newResetPasswordToken;
    const expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 1);
    userData.reset_password_expire = expireDate;

    const isUserUpdated = await this.dataServices.users.update(
      userData._id,
      userData,
    );
    if (isUserUpdated) {
      const mailOptions: MailSenderPayload = {
        from:
          '"User Service App" <' +
          this.configService.get().mail.MAIL_USER +
          '>',
        to: email, // list of receivers (separated by ,)
        subject: 'Forgot Password',
        text: 'Forgot Password',
        html:
          'Hi! <br><br> Your password reset token : <br><br>' +
          '<br><b>' +
          newResetPasswordToken +
          '</b><br>',
      };

      //TODO check sendMail result
      const result = await this.mailSenderService.sendMail(mailOptions);

      return Object.assign(new ResetPasswordResultDto(), {
        status: result,
      });
    } else {
      throw new InternalServerErrorException('Unexpected Error Occured');
    }
  }

  public createForgotPasswordToken(): string {
    //Generate 7 digits number
    const newPasswordToken = (
      Math.floor(Math.random() * 9000000) + 1000000
    ).toString();

    return newPasswordToken;
  }
}
