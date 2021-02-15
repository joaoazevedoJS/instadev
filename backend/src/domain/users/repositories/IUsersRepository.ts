import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateResendCodeDTO from '../dtos/IUpdateResendCodeDTO';
import IUsers from '../entities/IUsers';

interface IUsersRepository {
  findById(id: string): Promise<IUsers | undefined>;
  findByEmail(email: string): Promise<IUsers | undefined>;
  findByUserName(user_name: string): Promise<IUsers | undefined>;
  create(data: ICreateUserDTO): Promise<IUsers>;
  update(user: IUsers): Promise<void>;
  updateResendcode(data: IUpdateResendCodeDTO): Promise<void>;
}

export default IUsersRepository;
