import path from 'path';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import hbs from 'nodemailer-express-handlebars';

import { host, port, auth } from '../configs/mail.json';

export interface IMailerhandlebarsOptions {
  viewEngine: {
    partialsDir: string;
    defaultLayout: undefined | string;
  };
  viewPath: string;
  extName: string;
}

abstract class Mailer {
  private transport = nodemailer.createTransport({ host, port, auth });

  private mailsPath = path.resolve(__dirname, 'mails');

  private handleBars = () => {
    const handlebars: IMailerhandlebarsOptions = {
      viewEngine: { partialsDir: this.mailsPath, defaultLayout: undefined },
      viewPath: this.mailsPath,
      extName: '.html',
    };

    return handlebars;
  };

  public useTransport = (): Mail => {
    return this.transport.use('compile', hbs(this.handleBars()));
  };
}

export default Mailer;
