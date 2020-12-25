import Email from '../utils/Email';

interface MailProps {
  mail: Email;
  from: string;
  template: string;
}

abstract class Mail {
  public to: string;

  public from: string;

  public template: string;

  constructor({ mail, from, template }: MailProps) {
    this.to = mail.email;
    this.from = from;
    this.template = template;
  }
}

export default Mail;
