import { Router } from 'express';

import usersRoutes from './users.routes';
import followsRoutes from './follows.routes';
import sessionsRoutes from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);
routes.use('/users', usersRoutes);
routes.use('/follows', followsRoutes);

export default routes;
