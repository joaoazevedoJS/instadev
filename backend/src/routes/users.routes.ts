import { Router } from 'express';

import Authorization from '../middlewares/Authorization';

import CreateFollowService from '../services/CreateFollowService';
import DeleteFollowService from '../services/DeleteFollowService';
import GetUserInfoByUsernameService from '../services/GetUserInfoByUsernameService';
import ValidateUUIDService from '../services/ValidateUUIDService';

const usersRoutes = Router();

usersRoutes.post(
  '/follows/:follow_id',
  Authorization,
  async (request, response) => {
    const { follow_id } = request.params;
    const { id } = request.user;

    const validateUUID = new ValidateUUIDService();

    validateUUID.execute(follow_id);

    const createFollow = new CreateFollowService();

    const follow = await createFollow.execute({ follow_id, user_id: id });

    return response.status(201).json(follow);
  },
);

usersRoutes.delete(
  '/follows/:follow_id',
  Authorization,
  async (request, response) => {
    const { follow_id } = request.params;
    const { id } = request.user;

    const validateUUID = new ValidateUUIDService();

    validateUUID.execute(follow_id);

    const deleteFollow = new DeleteFollowService();

    await deleteFollow.execute({ follow_id, user_id: id });

    return response.status(204).send();
  },
);

usersRoutes.get('/:user_name', async (request, response) => {
  const { user_name } = request.params;

  const getUserInfoByUsername = new GetUserInfoByUsernameService();

  const info = await getUserInfoByUsername.execute(user_name);

  const userWithoutPassword = {
    ...info.user,
    password: undefined,
    verification_code: undefined,
  };

  const infoWithoutPassword = {
    ...info,
    user: userWithoutPassword,
  };

  return response.json({ ...infoWithoutPassword });
});

export default usersRoutes;
