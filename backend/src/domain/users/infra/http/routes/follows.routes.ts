import { Router } from 'express';

import FollowsController from '../controllers/FollowsController';

const followsRoutes = Router();
const followsController = new FollowsController();

followsRoutes.post('/:follow_id', followsController.create);
followsRoutes.delete('/:follow_id', followsController.delete);

export default followsRoutes;
