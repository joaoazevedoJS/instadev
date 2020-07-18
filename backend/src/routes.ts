import { Router } from 'express'

import SessionsController from './Controllers/SessionsController'
import VerifyAccountController from './Controllers/VerifyAccountController'
import WebAuthController from './Controllers/WebAuthController'
import FollowingController from './Controllers/FollowingController'

import Authorization from './auth/middlewares/Authorization'
import isMailVerified from './middlewares/isMailVerified'

const routes = Router()

const sessions = new SessionsController()
const verify = new VerifyAccountController()
const following = new FollowingController()
const webAuth = new WebAuthController()

routes.get('/verify-email-account', verify.verifyEmail)
routes.get('/verify-username-account', verify.verifyUserName)

routes.post('/signup', sessions.signup)
routes.post('/signin', sessions.signin)

routes.use('/user', Authorization)

routes.put('/user/confirm-account/:code', webAuth.confirmAccount)
routes.get('/user/following', isMailVerified, following.index)

// user actions

routes.post('/user/action/following/:followId', isMailVerified, following.store)
routes.delete('/user/action/unfollowing/:followId', isMailVerified, following.destroy)
routes.put('/user/action/resend-code', webAuth.resendCode)

// web action

routes.get('/user/web-action/authenticated', webAuth.authenticated)

export default routes
