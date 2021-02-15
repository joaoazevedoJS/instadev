import IMail from './IMail';

interface IContext {
  email: string;
  code: string;
}

class IMailAccountCode implements IMail {
  public to: string;

  public from: string;

  public template: string;

  public context: {
    email: string;
    accountCode: string;
  };

  constructor({ email, code }: IContext) {
    this.to = email;

    this.from = 'no-reply@mail.instadev.com';

    this.template = 'confirm_account';

    this.context = { email, accountCode: code };
  }
}

export default IMailAccountCode;
