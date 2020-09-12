import IErrors from '../interfaces/IErrors'

class PublicationsError {
  public errorInCreatePublication: IErrors = {
    status: 400,
    message: 'Unexpected error while creating new publication'
  }

  public errorPublicationNotFound: IErrors = {
    status: 404,
    message: 'Publication not Found'
  }

  public errorInDeletePublication: IErrors = {
    status: 400,
    message: 'Unexpected error while delete publication'
  }
}

export default PublicationsError
