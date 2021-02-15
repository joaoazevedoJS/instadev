import { Router } from 'express';

import Authorization from '@domain/users/infra/http/middlewares/Authorization';

import ResendCodeController from '../controllers/smtp/ResendCodeController';

const mailsRoutes = Router();
const resendCodeController = new ResendCodeController();

mailsRoutes.post('/resendcode', Authorization, resendCodeController.create);

export default mailsRoutes;
