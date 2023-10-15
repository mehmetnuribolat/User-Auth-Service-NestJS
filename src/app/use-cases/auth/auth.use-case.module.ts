import { Module } from '@nestjs/common';
import { AuthUseCases } from './auth.use-case';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthServicesModule } from '../../services/auth-services/auth-services.module';
import { MailSenderModule } from '../../services/mail-services/mail-sender.module';
import { ConfigurationModule } from '../../../config';

@Module({
  imports: [
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    DataServicesModule,
    AuthServicesModule,
    MailSenderModule,
    ConfigurationModule,
  ],
  providers: [AuthUseCases],
  exports: [AuthUseCases],
})
export class AuthUseCasesModule {}
