import { Router } from 'express'

import SessionsController from './Controllers/SessionsController'
import UserController from './Controllers/UserController'
import VerifyAccountController from './Controllers/VerifyAccountController'
import WebAuthController from './Controllers/WebAuthController'
import FollowingController from './Controllers/FollowingController'
import FollowersController from './Controllers/FollowersController'

import Authorization from './auth/middlewares/Authorization'
import isMailVerified from './middlewares/isMailVerified'
import URLDashboard from './middlewares/URLDashboard'

const routes = Router()

const sessions = new SessionsController()
const user = new UserController()
const verify = new VerifyAccountController()
const following = new FollowingController()
const followers = new FollowersController()
const webAuth = new WebAuthController()

routes.get('/verify-email-account', verify.verifyEmail)
routes.get('/verify-username-account', verify.verifyUserName)

routes.post('/signup', sessions.signup)
routes.post('/signin', sessions.signin)

// users - global

routes.get('/users/dashboard', URLDashboard, user.show)
routes.get('/users/following', URLDashboard, following.index)
routes.get('/users/followers', URLDashboard, followers.index)

// user - private

routes.use('/user', Authorization)

routes.put('/user/confirm-account/:code', webAuth.confirmAccount)

// user actions

routes.post('/user/action/following/:followId', isMailVerified, following.store)
routes.delete('/user/action/unfollowing/:followId', isMailVerified, following.destroy)
routes.put('/user/action/resend-code', webAuth.resendCode)

// web action

routes.get('/user/web-action/authenticated', webAuth.authenticated)

export default routes
