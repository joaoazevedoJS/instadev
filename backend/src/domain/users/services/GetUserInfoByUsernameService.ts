import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsers from '../entities/IUsers';
import IUsersRepository from '../repositories/IUsersRepository';

import IFollowsRepository from '../repositories/IFollowsRepository';
import IFollowsCountDTO from '../dtos/IFollowsCountDTO';

interface IResponse {
  user: IUsers;
  follows: IFollowsCountDTO;
}

@injectable()
class GetUserInfoByUsernameService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('FollowsRepository')
    private followsRepository: IFollowsRepository,
  ) {}

  public async execute(user_name: string): Promise<IResponse> {
    const user = await this.usersRepository.findByUserName(user_name.trim());

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const follows = await this.followsRepository.getFollowsCountByUser(user.id);

    return { user, follows };
  }
}

export default GetUserInfoByUsernameService;
