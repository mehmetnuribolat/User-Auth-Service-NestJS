export interface MailSenderPayload {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

export interface MailSenderResponse {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

export abstract class IMailSenderService {
  abstract sendMail(mailPayload: MailSenderPayload): Promise<boolean>;
}
