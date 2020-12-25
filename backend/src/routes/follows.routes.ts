import { Router } from 'express';

const followsRoutes = Router();

followsRoutes.get('/', (request, response) => {
  return response.json({ ok: true });
});

export default followsRoutes;
