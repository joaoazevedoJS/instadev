import { Router } from 'express'

import SessionsController from '@UsersControllers/SessionsController'
import UserController from '@UsersControllers/UserController'
import FollowingController from '@UsersControllers/FollowingController'
import FollowersController from '@UsersControllers/FollowersController'

import PublicationsController from '@PublicationsControllers/PublicationsController'
import SearchPublicationsController from '@PublicationsControllers/SearchPublicationsController'

import LikesPublicationsController from '@LikesControllers/LikesPublicationsController'
import LikesCommentsControllers from '@LikesControllers/LikesCommentsControllers'
import LikesCommentsOfCommentController from '@LikesControllers/LikesCommentsOfCommentController'

import CommentsPublicationsController from '@CommentsControllers/CommentsPublicationsController'
import CommentaryOfCommentsController from '@CommentsControllers/CommentaryOfCommentsController'

import VerifyAccountController from '@WebControllers/VerifyAccountController'
import WebAuthController from '@WebControllers/WebAuthController'

import Authorization from './auth/middlewares/Authorization'
import isMailVerified from './middlewares/isMailVerified'
import URLDashboard from './middlewares/URLDashboard'

const routes = Router()

const sessions = new SessionsController()
const following = new FollowingController()
const followers = new FollowersController()

const LikesPublications = new LikesPublicationsController()
const LikesComments = new LikesCommentsControllers()
const LikesCommentsOfComment = new LikesCommentsOfCommentController()

routes.get('/verify-email-account', VerifyAccountController.verifyEmail)
routes.get('/verify-username-account', VerifyAccountController.verifyUserName)

routes.post('/signup', sessions.signup)
routes.post('/signin', sessions.signin)

// users - global

routes.get('/users/dashboard', URLDashboard, UserController.show)
routes.get('/users/following', URLDashboard, following.index)
routes.get('/users/followers', URLDashboard, followers.index)
routes.get('/users/publications', URLDashboard, PublicationsController.index)
routes.get('/users/publications/likes/:PublicationId', LikesPublications.index)
routes.get('/users/publications/comments/:PublicationId', CommentsPublicationsController.index)

// user - private

routes.use('/user', Authorization)

routes.get('/user/explore/publications', SearchPublicationsController.index)

routes.put('/user/update-account', UserController.update)
routes.put('/user/confirm-account/:code', WebAuthController.confirmAccount)

// user actions

routes.post('/user/action/following/:followId', isMailVerified, following.store)
routes.delete('/user/action/following/:followId', isMailVerified, following.destroy)

routes.post('/user/action/publications', isMailVerified, PublicationsController.store)
routes.delete('/user/action/publications/:PublicationId', isMailVerified, PublicationsController.destroy)

routes.post('/user/action/comments/:PublicationId', isMailVerified, CommentsPublicationsController.store)
routes.delete('/user/action/comments/:CommentId', isMailVerified, CommentsPublicationsController.destroy)

routes.post('/user/action/comments-comments/:CommentId', isMailVerified, CommentaryOfCommentsController.store)
routes.delete('/user/action/comments-comments/:CommentFromCommentsId', isMailVerified, CommentaryOfCommentsController.destroy)

routes.post('/user/action/like/publication/:PublicationId', isMailVerified, LikesPublications.store)
routes.delete('/user/action/like/publication/:LikeId', isMailVerified, LikesPublications.destroy)

routes.post('/user/action/like/comments/:CommentId', isMailVerified, LikesComments.store)
routes.delete('/user/action/like/comments/:LikeId', isMailVerified, LikesComments.destroy)

routes.post('/user/action/like/comments-comment/:CommentCommentId', isMailVerified, LikesCommentsOfComment.store)
routes.delete('/user/action/like/comments-comment/:LikeId', isMailVerified, LikesCommentsOfComment.destroy)

routes.post('/user/action/resend-code', WebAuthController.resendCode)

// web action

routes.get('/user/web-action/authenticated', WebAuthController.authenticated)

export default routes
