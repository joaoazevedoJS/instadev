import Email from '../utils/Email';

interface MailAccountDTO {
  mail: Email;
  code: string;
}

class MailAccountCode {
  public to: string;

  public from: string;

  public template: string;

  public context: {
    email: string;
    accountCode: string;
  };

  constructor({ mail, code }: MailAccountDTO) {
    if (code.length !== 6) {
      throw new Error('The code is not valid');
    }

    this.to = mail.email;
    this.context = { email: mail.email, accountCode: code };
    this.from = 'no-reply@mail.instadev.com';
    this.template = 'confirm_account';
  }
}

export default MailAccountCode;
