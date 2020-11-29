import bcrypt from 'bcryptjs';

class Password {
  private password: string;

  constructor(password: string) {
    if (password.length < 8) {
      throw Error('Password not valid!');
    }

    this.password = password;
  }

  public cryptPassword = async (): Promise<string> => {
    const password = await bcrypt.hash(this.password, 10);

    return password;
  };
}

export default Password;
