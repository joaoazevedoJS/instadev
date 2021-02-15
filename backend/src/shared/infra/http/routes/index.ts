import { Router } from 'express';

import usersRoutes from '@domain/users/infra/http/routes/users.routes';
import sessionsRoutes from '@domain/users/infra/http/routes/sessions.routes';
import mailsRoutes from './mails.routes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);
routes.use('/users', usersRoutes);
routes.use('/mails', mailsRoutes);

export default routes;
