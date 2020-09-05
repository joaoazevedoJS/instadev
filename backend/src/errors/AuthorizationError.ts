// eslint-disable-next-line no-unused-vars
import IErrors from '../interfaces/IErrors'

class AuthorizationError {
  public errorNoTokenProvided: IErrors = {
    status: 401,
    message: 'No Token Provided'
  }

  public errorTokenMalformed: IErrors = {
    status: 401,
    message: 'Token Malformed'
  }

  public errorTokenInvalid: IErrors = {
    status: 401,
    message: 'Token Invalid'
  }
}

export default AuthorizationError
