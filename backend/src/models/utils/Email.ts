class Email {
  public email: string;

  constructor(email: string) {
    if (!email.match(/\S+@\w+\.\w{2,6}(\.\w{2})?/g)) {
      throw Error('E-mail not valid!');
    }

    this.email = email;
  }
}

export default Email;
