import IUsers from '../entities/IUsers';

interface IUpdateResendCodeDTO {
  user: IUsers;
  code: string;
}

export default IUpdateResendCodeDTO;
