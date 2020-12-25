import Mail from '../models/smtp/Mail';

import Mailer from '../smtp/mailer';

class SendMailService extends Mailer {
  public execute = async (mail: Mail): Promise<void> => {
    await this.useTransport().sendMail(mail);
  };
}

export default SendMailService;
