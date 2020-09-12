import Mailer from './Mailer'
import { IMailProps } from '../interfaces/IMailer'

class Mail extends Mailer {
  private FactoryMails = (to: string, from: string, template: string, context: object) => {
    const mail: IMailProps = { to, from, template, context }

    return mail
  }

  public mailConfirmAccount = async (email: string, accountCode: string) => {
    const mail = this.FactoryMails(email, 'no-reply@mail.instadev.com', 'confirm_account', { email, accountCode })

    await this.sendMail(mail)
  }
}

export default Mail
