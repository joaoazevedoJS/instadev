import IMail from './mails/IMail';

interface IMailer {
  sendMail(mail: IMail): Promise<void>;
}

export default IMailer;
