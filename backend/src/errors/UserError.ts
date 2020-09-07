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
}

export default UserError