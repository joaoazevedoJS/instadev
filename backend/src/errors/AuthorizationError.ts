// eslint-disable-next-line no-unused-vars
import IErrors from '../interfaces/IErrors'

class AuthorizationError {
  public errorNoTokenProvided: IErrors = {
    status: 401,
    message: 'No Token Provided'
  }
}

export default AuthorizationError
