import Mail from './Mail';
import Email from '../utils/Email';

interface MailAccountDTO {
  mail: Email;
  code: string;
}

class MailAccountCode extends Mail {
  public context: {
    email: string;
    accountCode: string;
  };

  constructor({ mail, code }: MailAccountDTO) {
    super({
      mail,
      from: 'no-reply@mail.instadev.com',
      template: 'confirm_account',
    });

    this.context = { email: mail.email, accountCode: code };
  }
}

export default MailAccountCode;
