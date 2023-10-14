import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {
  IMailSenderService,
  MailSenderPayload,
} from '../../core/abstracts/mail-sender-service.abstract';

@Injectable()
export class MailSenderService implements IMailSenderService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(mailPayload: MailSenderPayload): Promise<boolean> {
    let result = false;
    await this.mailerService
      .sendMail({
        to: mailPayload.to,
        from: mailPayload.from,
        subject: mailPayload.subject,
        text: mailPayload.text,
        html: mailPayload.html,
      })
      .then((success) => {
        console.log(success);
        result = true;
      })
      .catch((err) => {
        console.log(err);
        result = false;
      });
    return result;
  }
}
