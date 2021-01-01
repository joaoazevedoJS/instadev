import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';

import uploadConfig from '../../configs/upload';

import Users from '../../models/entities/Users';

import AppError from '../../errors/AppError';

interface Request {
  filename: string;
  user_id: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, filename }: Request): Promise<void> {
    const usersRepositories = getRepository(Users);

    const user = await usersRepositories.findOne(user_id);

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

    await usersRepositories.save(user);
  }
}

export default UpdateUserAvatarService;
