import { Router } from 'express';

import UsersRepositories from '../repositories/UsersRepositories';

const followsRoutes = Router();
const usersRepositories = new UsersRepositories();

followsRoutes.post('/', (request, response) => {});

export default followsRoutes;
