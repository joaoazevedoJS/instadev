import { Router } from 'express'

import SessionsController from './Controllers/SessionsController'

import Authorization from './auth/middlewares/Authorization'
import VerifySignUp from './middlewares/VerifySignUp'

const routes = Router()

const sessions = new SessionsController()
const verify = new VerifySignUp()

routes.get('/verify-email-account', verify.verifyEmail)
routes.get('/verify-username-account', verify.verifyUserName)

routes.post('/signup', sessions.signup)
routes.post('/signin', sessions.signin)

routes.use(Authorization)

export default routes
