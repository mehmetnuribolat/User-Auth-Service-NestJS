import { Module } from '@nestjs/common';
import {
  AppController,
  AuthController,
  UserController,
} from './app/adapter/controllers';
import { RefreshTokenJwtStrategy } from './app/adapter/strategies/refresh_jwt.strategy';
import { AccessTokenJwtStrategy } from './app/adapter/strategies/access_jwt.strategy';
import { DataServicesModule } from './app/services/data-services/data-services.module';
import { UserUseCasesModule } from './app/use-cases/user/user-use-cases.module';
import { AuthUseCasesModule } from './app/use-cases/auth/auth.use-case.module';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from './config';

@Module({
  imports: [
    ConfigModule,
    DataServicesModule,
    UserUseCasesModule,
    AuthUseCasesModule,
    TerminusModule,
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AccessTokenJwtStrategy, RefreshTokenJwtStrategy],
})
export class AppModule {}
