import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import Users from '../models/entities/Users';
import FollowsRepositories from '../repositories/FollowsRepositories';

const usersRoutes = Router();

usersRoutes.get('/:user_name', async (request, response) => {
  try {
    const { user_name } = request.params;

    const usersRepositories = getRepository(Users);

    const user = await usersRepositories.findOne({ where: { user_name } });

    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    const followRepositories = getCustomRepository(FollowsRepositories);

    const follows = await followRepositories.getFollowsCountByUser(user.id);

    const userWithoutPassword = { ...user, password: undefined };

    return response.json({ user: userWithoutPassword, follows });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

export default usersRoutes;
