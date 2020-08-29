// eslint-disable-next-line no-unused-vars
import IErrors from '../interfaces/IErrors'

class CommentsErros {
  public errorMessageNoContent: IErrors = {
    status: 400,
    message: 'Message no content'
  }

  public errorPublicationNotFound: IErrors = {
    status: 404,
    message: 'Publication not Found'
  }

  public errorInCreateCommentary: IErrors = {
    status: 400,
    message: 'Unexpected error while creating new commentary'
  }

  public errorCommentaryNotFound: IErrors = {
    status: 404,
    message: 'Commentary not Found'
  }

  public errorInDeleteCommentary: IErrors = {
    status: 400,
    message: 'Unexpected error while delete commentary'
  }
}

export default CommentsErros
