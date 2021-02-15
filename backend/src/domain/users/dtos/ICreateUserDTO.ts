interface ICreateUserDTO {
  email: string;

  password: string;

  user_name: string;

  name: string;

  verification_code: string;

  birthday: Date;
}

export default ICreateUserDTO;
