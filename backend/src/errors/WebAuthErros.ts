// eslint-disable-next-line no-unused-vars
import IErrors from '../interfaces/IErrors'

class UserError {
  public errorUserNotFound: IErrors = {
    status: 404,
    message: 'User not Found'
  }
}

export default UserError
