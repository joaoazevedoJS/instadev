import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '../configs/upload';

import Authorization from '../middlewares/Authorization';

import CreateFollowService from '../services/UsersService/CreateFollowService';
import DeleteFollowService from '../services/UsersService/DeleteFollowService';
import GetUserInfoByUsernameService from '../services/UsersService/GetUserInfoByUsernameService';
import ValidateUUIDService from '../auth/ValidateUUIDService';
import UpdateUserAvatarService from '../services/UsersService/UpdateUserAvatarService';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post(
  '/follows/:follow_id',
  Authorization,
  async (request, response) => {
    const { follow_id } = request.params;
    const { id } = request.user;

    ValidateUUIDService(follow_id);

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

    ValidateUUIDService(follow_id);

    const deleteFollow = new DeleteFollowService();

    await deleteFollow.execute({ follow_id, user_id: id });

    return response.status(204).send();
  },
);

usersRoutes.patch(
  '/avatar',
  Authorization,
  upload.single('avatar'),
  async (request, response) => {
    const { id } = request.user;
    const { filename } = request.file;

    const updateUserAvatar = new UpdateUserAvatarService();

    await updateUserAvatar.execute({ user_id: id, filename });

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
