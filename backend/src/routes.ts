import { Router } from 'express'

import SessionsController from '@UsersControllers/SessionsController'
import UserController from '@UsersControllers/UserController'
import FollowController from '@UsersControllers/FollowController'
import ResendCodeController from '@UsersControllers/ResendCodeController'
import ConfirmAccountController from '@UsersControllers/ConfirmAccountController'

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
import IsMailVerified from './middlewares/IsMailVerified'
import URLDashboard from './middlewares/URLDashboard'

const routes = Router()

const sessions = new SessionsController()

const LikesPublications = new LikesPublicationsController()
const LikesComments = new LikesCommentsControllers()
const LikesCommentsOfComment = new LikesCommentsOfCommentController()

routes.get('/verify-email-account', VerifyAccountController.verifyEmail)
routes.get('/verify-username-account', VerifyAccountController.verifyUserName)

routes.post('/signup', sessions.signup)
routes.post('/signin', sessions.signin)

// users - global

routes.get('/users/dashboard', URLDashboard.show, UserController.show)
routes.get('/users/follow', URLDashboard.show, FollowController.index)
routes.get('/users/publications', URLDashboard.show, PublicationsController.index)
routes.get('/users/publications/likes/:PublicationId', LikesPublications.index)
routes.get(
  '/users/publications/comments/:PublicationId',
  CommentsPublicationsController.index
)

// user - private

routes.use('/user', Authorization.show)

routes.get('/user/explore/publications', SearchPublicationsController.index)
routes.put('/user/update-account', UserController.update)
routes.put('/user/confirm-account/:code', ConfirmAccountController.update)

// user actions
routes.post('/user/action/resend-code', ResendCodeController.store)

routes.post(
  '/user/action/following/:followId',
  IsMailVerified.show,
  FollowController.store
)
routes.delete(
  '/user/action/following/:followId',
  IsMailVerified.show,
  FollowController.destroy
)

routes.post(
  '/user/action/publications',
  IsMailVerified.show,
  PublicationsController.store
)
routes.delete(
  '/user/action/publications/:PublicationId',
  IsMailVerified.show,
  PublicationsController.destroy
)

routes.post(
  '/user/action/comments/:PublicationId',
  IsMailVerified.show,
  CommentsPublicationsController.store
)
routes.delete(
  '/user/action/comments/:CommentId',
  IsMailVerified.show,
  CommentsPublicationsController.destroy
)

routes.post(
  '/user/action/comments-comments/:CommentId',
  IsMailVerified.show,
  CommentaryOfCommentsController.store
)
routes.delete(
  '/user/action/comments-comments/:CommentFromCommentsId',
  IsMailVerified.show,
  CommentaryOfCommentsController.destroy
)

routes.post(
  '/user/action/like/publication/:PublicationId',
  IsMailVerified.show,
  LikesPublications.store
)
routes.delete(
  '/user/action/like/publication/:LikeId',
  IsMailVerified.show,
  LikesPublications.destroy
)

routes.post(
  '/user/action/like/comments/:CommentId',
  IsMailVerified.show,
  LikesComments.store
)
routes.delete(
  '/user/action/like/comments/:LikeId',
  IsMailVerified.show,
  LikesComments.destroy
)

routes.post(
  '/user/action/like/comments-comment/:CommentCommentId',
  IsMailVerified.show,
  LikesCommentsOfComment.store
)
routes.delete(
  '/user/action/like/comments-comment/:LikeId',
  IsMailVerified.show,
  LikesCommentsOfComment.destroy
)

// web action

routes.get('/user/web-action/authenticated', WebAuthController.authenticated)

export default routes
