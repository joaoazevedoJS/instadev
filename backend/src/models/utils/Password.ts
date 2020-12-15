import bcrypt from 'bcryptjs';

class Password {
  private password: string;

  constructor(password: string) {
    const containUpperCase = password.match(/(?=.*[A-Z])/g);
    const containSpecialChar = password.match(/(?=.*[@#$%!^&*])/g);
    const passwordMustLonger = password.match(/.{8,}$/g);

    if (!containUpperCase) {
      throw new Error('Password must contain a capital letter!');
    }

    if (!containSpecialChar) {
      throw new Error('Password must contain a special characters!');
    }

    if (!passwordMustLonger) {
      throw Error('Password must be longer than 8 characters!');
    }

    this.password = password;
  }

  public cryptPassword = async (): Promise<string> => {
    const password = await bcrypt.hash(this.password, 10);

    return password;
  };
}

export default Password;
