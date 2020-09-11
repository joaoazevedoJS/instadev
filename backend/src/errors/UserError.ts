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

  public errorCodeNotExists: IErrors = {
    status: 404,
    message: 'Code Not Exists! Verifed your code account!'
  }

  public errorUserNameMalformed: IErrors = {
    status: 400,
    message: 'User_name Malformed'
  }
}

export default UserError
