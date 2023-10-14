import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IJwtAuthPayload,
  IJwtAuthResponse,
  IJwtAuthService,
  IJwtTokenValidation,
} from '../../../core/abstracts';
import { ConfigService } from '../../../../config/config.service';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthService implements IJwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async checkToken(token: string): Promise<IJwtTokenValidation> {
    try {
      const decode = await this.jwtService.verifyAsync(token, {
        publicKey: this.configService.get().auth.JWT_ACCESS_TOKEN_SECRET,
        issuer: this.configService.get().auth.JWT_ISSUER,
        audience: this.configService.get().auth.JWT_AUDIENCE,
      });

      const dataToReturn: IJwtTokenValidation = {
        role: decode.role,
        userId: decode.userId,
        email: decode.email,
        iat: decode.iat,
        exp: decode.exp,
        access_token: token,
      };

      return dataToReturn;
    } catch (err: any) {
      if (!(err instanceof JsonWebTokenError)) {
        //TODO  Internal Server Error Send Log
        console.log(err.message);
      }
      return null;
    }
  }

  public async createToken(
    jwtPayload: IJwtAuthPayload,
  ): Promise<IJwtAuthResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get().auth.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: this.configService.get().auth.JWT_EXPIRES_IN,
        audience: this.configService.get().auth.JWT_AUDIENCE,
        issuer: this.configService.get().auth.JWT_ISSUER,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get().auth.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: this.configService.get().auth.JWT_EXPIRES_IN,
        audience: this.configService.get().auth.JWT_AUDIENCE,
        issuer: this.configService.get().auth.JWT_ISSUER,
      }),
    ]);
    const dataToReturn: IJwtAuthResponse = {
      ...jwtPayload,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
    return dataToReturn;
  }
}
