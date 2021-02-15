class ValidateEmailService {
  public execute(email: string): void {
    const isValid = email.match(/\S+@\w+\.\w{2,6}(\.\w{2})?/g);

    if (!isValid) {
      throw Error('E-mail is not valid!');
    }
  }
}

export default ValidateEmailService;
