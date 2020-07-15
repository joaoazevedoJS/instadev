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
routes.put('/verify-code-account/:code', Authorization, verify.verifyCode)

routes.post('/signup', sessions.signup)
routes.post('/signin', sessions.signin)

routes.use(Authorization)

routes.get('/user/authenticated', webAuth.authenticated)
routes.get('/user/confirmAccount', webAuth.confirmAccount)

export default routes
