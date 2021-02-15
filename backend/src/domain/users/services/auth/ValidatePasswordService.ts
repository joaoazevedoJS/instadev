class ValidatePasswordService {
  public execute(password: string): void {
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
  }
}

export default ValidatePasswordService;
