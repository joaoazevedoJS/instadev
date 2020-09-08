// eslint-disable-next-line no-unused-vars
import IErrors from '../interfaces/IErrors'

class UserError {
  public errorUserNotFound: IErrors = {
    status: 404,
    message: 'User not Found'
  }

  public errorUserUpdate: IErrors = {
    status: 400,
    message: 'Unexpected error while user update'
  }

  public errorMailNotVerified: IErrors = {
    status: 401,
    message: 'E-mail not Verified'
  }

  public errorMailAlreadyVerified: IErrors = {
    status: 409,
    message: 'Email has already been verified'
  }

  public errorCodeNotExists: IErrors = {
    status: 404,
    message: 'Code Not Exists! Verifed your code account!'
  }
}

export default UserError
