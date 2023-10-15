import { Module } from '@nestjs/common';
import { IMailSenderService } from '../../core/abstracts/mail-sender-service.abstract';
import { MailSenderService } from './mail-sender.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '../../../config/config.service';
import { ConfigurationModule } from '../../../config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get().mail.MAIL_HOST,
            port: configService.get().mail.MAIL_PORT,
            secure: configService.get().mail.MAIL_SECURE, // true for 465, false for other ports
            auth: {
              user: configService.get().mail.MAIL_USER, // generated ethereal user
              pass: configService.get().mail.MAIL_PASSWORD, // generated ethereal password
            },
          },
          defaults: {
            from: '"nest-modules" <user@outlook.com>', // outgoing email ID
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: IMailSenderService,
      useClass: MailSenderService,
    },
  ],
  exports: [IMailSenderService],
})
export class MailSenderModule {}
