import path from 'path'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'

import { host, port, auth } from '../configs/mail.json' // permite colocar html dentro de variáveis

interface handlebarsOptions {
  viewEngine: {
    partialsDir: string,
    defaultLayout: undefined | string,
  },
  viewPath: string,
  extName: string,
}

const transport = nodemailer.createTransport({
  host,
  port,
  auth
})

const mails = path.resolve(__dirname, 'mails')

const handlebars: handlebarsOptions = {
  viewEngine: {
    partialsDir: mails,
    defaultLayout: undefined
  },
  viewPath: mails,
  extName: '.html'
}

transport.use('compile', hbs(handlebars))

export default transport
