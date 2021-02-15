import { injectable, inject } from 'tsyringe';

import IMailer from '@shared/smtp/IMailer';

import IMail from '@shared/smtp/mails/IMail';

@injectable()
class SendMailService {
  constructor(
    @inject('Mailer')
    private mailer: IMailer,
  ) {}

  public execute = async (mail: IMail): Promise<void> => {
    await this.mailer.sendMail(mail);
  };
}

export default SendMailService;
