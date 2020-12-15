import { Router } from 'express';

import usersRoutes from './users.routes';
import followsRoutes from './follows.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/follows', followsRoutes);

export default routes;
