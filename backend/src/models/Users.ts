import randomCode from '../utils/randomCode';

interface CreateUserDTO {
  email: string;
  user_name: string;
  name: string;
  password: string;
}

class Users {
  public id: number;

  public email: string;

  public user_name: string;

  public name: string;

  public password: string;

  public photo: string;

  public confirmAccount: boolean;

  public accountCode: string;

  public limit_resend: number;

  public limit_date_resend: Date;

  public privateAccount: boolean;

  public created_at: Date;

  constructor({ email, name, user_name, password }: CreateUserDTO) {
    const user = user_name.trim().split(' ');

    if (user.length !== 1) throw new Error('User_name cannot cotain spaces');

    this.email = email.trim();
    this.name = name.trim();
    this.user_name = user_name.trim();
    this.password = password;

    this.limit_resend = 0;
    this.privateAccount = false;
    this.confirmAccount = false;
    this.accountCode = randomCode(6);
    this.created_at = new Date();
  }
}

export default Users;
