// eslint-disable-next-line no-unused-vars
import IErrors from '../interfaces/IErrors'

class MailError {
  public errorMailNotVerified: IErrors = {
    status: 401,
    message: 'E-mail not Verified'
  }

  public errorMailAlreadyVerified: IErrors = {
    status: 409,
    message: 'Email has already been verified'
  }

  public errorLimitResend: IErrors = {
    status: 401,
    message: 'Limit Resend Mail'
  }

  public errorWhileSendMail: IErrors = {
    status: 400,
    message: 'Unexpected error while send mail'
  }
}

export default MailError
