import path from 'path'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'

import { IMailerhandlebarsOptions, IMailProps } from '../interfaces/IMailer'
import { host, port, auth } from '../configs/mail.json'

class Mailer {
  private _transport = nodemailer.createTransport({ host, port, auth })
  private _mailsPath = path.resolve(__dirname, 'mails')

  private handleBars = () => {
    const hbs: IMailerhandlebarsOptions = {
      viewEngine: { partialsDir: this._mailsPath, defaultLayout: undefined },
      viewPath: this._mailsPath,
      extName: '.html'
    }

    return hbs
  }

  private transport = () => {
    return this._transport.use('compile', hbs(this.handleBars()))
  }

  protected sendMail = async (mailProps: IMailProps) => {
    await this.transport().sendMail(mailProps)
  }
}

export default Mailer
