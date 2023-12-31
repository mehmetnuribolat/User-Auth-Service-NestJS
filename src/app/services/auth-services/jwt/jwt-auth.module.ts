import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { IJwtAuthService } from '../../../core/abstracts';
import { ConfigurationModule } from '../../../../config';

@Module({
  imports: [
    ConfigurationModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({}),
  ],
  providers: [
    {
      provide: IJwtAuthService,
      useClass: JwtAuthService,
    },
  ],
  exports: [IJwtAuthService],
})
export class JwtAuthModule {}
