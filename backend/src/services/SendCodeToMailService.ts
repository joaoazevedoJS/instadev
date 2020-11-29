import Email from 'src/models/Email';
import MailAccountCode from 'src/models/smtp/MailAccountCode';
import Mailer from '../smtp/mailer';

interface Mail {
  mail: Email;
  code: string;
}

class SendCodeToMailService {
  private mailer: Mailer;

  constructor(mailer: Mailer) {
    this.mailer = mailer;
  }

  public execute = async ({ mail, code }: Mail): Promise<void> => {
    const mailAccountCode = new MailAccountCode({ mail, code });

    await this.mailer.useTransport().sendMail(mailAccountCode);
  };
}

export default SendCodeToMailService;
