import { Module } from '@nestjs/common';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { BcryptModule } from './bcrypt/bcrypt.module';

@Module({
  imports: [BcryptModule, JwtAuthModule],
  exports: [BcryptModule, JwtAuthModule],
})
export class AuthServicesModule {}
