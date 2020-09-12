import IErrors from '../interfaces/IErrors'

class FollowError {
  public errorCantFollow: IErrors = {
    status: 401,
    message: "You can't following you"
  }

  public errorCantUnFollow: IErrors = {
    status: 401,
    message: "You can't unfollowing you"
  }

  public errorCantFollowAgain: IErrors = {
    status: 401,
    message: "You can't following again"
  }

  public errorCreateNewFollow: IErrors = {
    status: 400,
    message: 'Unexpected error while create a new follow'
  }

  public errorDeleteFollow: IErrors = {
    status: 400,
    message: 'Unexpected error while delete the follow'
  }
}

export default FollowError
