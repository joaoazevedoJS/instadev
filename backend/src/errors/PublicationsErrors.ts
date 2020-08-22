class PublicationsError {
  public errorInCreatePublication = {
    status: 400,
    message: 'Unexpected error while creating new publication'
  }

  public errorInSearchPublication = {
    status: 401,
    message: 'Only the user who created the publications can delete them'
  }

  public errorInDeletePublication = {
    status: 400,
    message: 'Unexpected error while delete publication'
  }
}

export default PublicationsError
