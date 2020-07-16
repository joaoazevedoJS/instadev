import { Router } from 'express'

import SessionsController from './Controllers/SessionsController'
import VerifyAccountController from './Controllers/VerifyAccountController'
import WebAuthController from './Controllers/WebAuthController'

import Authorization from './auth/middlewares/Authorization'

const routes = Router()

const sessions = new SessionsController()
const verify = new VerifyAccountController()
const webAuth = new WebAuthController()

routes.get('/verify-email-account', verify.verifyEmail)
routes.get('/verify-username-account', verify.verifyUserName)
routes.get('/verify-code-account', Authorization, verify.verifyCode)

routes.post('/signup', sessions.signup)
routes.post('/signin', sessions.signin)

routes.use('/user', Authorization)

routes.get('/user/authenticated', webAuth.authenticated)
routes.put('/user/confirm-account/:code', webAuth.confirmAccount)
routes.put('/user/resend-code', webAuth.resendCode)

export default routes
