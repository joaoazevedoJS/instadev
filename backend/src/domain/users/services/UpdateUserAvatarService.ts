import fs from 'fs';
import path from 'path';
import { inject, injectable } from 'tsyringe';

import uploadConfig from '@configs/upload';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  filename: string;
  user_id: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, filename }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.user_avatar) {
      const filepath = path.join(uploadConfig.directory, user.user_avatar);

      const avatarAlreadyExist = await fs.promises.stat(filepath);

      if (avatarAlreadyExist) {
        await fs.promises.unlink(filepath);
      }
    }

    user.user_avatar = filename;

    await this.usersRepository.update(user);
  }
}

export default UpdateUserAvatarService;
