import mailer from '../smtp/mailer'

function SendMail (to: string, from: string, template: string, context: object) {
  mailer.sendMail({
    to,
    from,
    template,
    context
  })
}

export default SendMail
