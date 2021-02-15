import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@configs/upload';

import followsRoutes from './follows.routes';

import Authorization from '../middlewares/Authorization';

import UsersController from '../controllers/UsersController';
import AvatarUserController from '../controllers/AvatarUserController';

const usersRoutes = Router();
const usersController = new UsersController();
const avatarUserController = new AvatarUserController();

const upload = multer(uploadConfig);

usersRoutes.post('/signup', usersController.create);
usersRoutes.get('/:user_name', usersController.show);

usersRoutes.patch(
  '/avatar',
  Authorization,
  upload.single('avatar'),
  avatarUserController.update,
);

usersRoutes.use('/follows', Authorization, followsRoutes);

export default usersRoutes;
