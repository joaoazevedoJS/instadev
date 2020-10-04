import { Router } from 'express'

import SessionsController from '@UsersControllers/SessionsController'
import UserController from '@UsersControllers/UserController'
import FollowController from '@UsersControllers/FollowController'
import ResendCodeController from '@UsersControllers/ResendCodeController'
import ConfirmAccountController from '@UsersControllers/ConfirmAccountController'
import VerifyAccountController from '@UsersControllers/VerifyAccountController'

import PublicationsController from '@PublicationsControllers/PublicationsController'
import SearchPublicationsController from '@PublicationsControllers/SearchPublicationsController'

import LikesPublicationsController from '@LikesControllers/LikesPublicationsController'
import LikesCommentsControllers from '@LikesControllers/LikesCommentsControllers'
import LikesCommentaryCommentsController from '@LikesControllers/LikesCommentaryCommentsController'

import CommentsPublicationsController from '@CommentsControllers/CommentsPublicationsController'
import CommentaryOfCommentsController from '@CommentsControllers/CommentaryOfCommentsController'

import Authorization from './auth/middlewares/Authorization'
import IsMailVerified from './middlewares/IsMailVerified'
import URLDashboard from './middlewares/URLDashboard'

const routes = Router()

routes.get('/verify-email-account', VerifyAccountController.verifyEmail)
routes.get('/verify-username-account', VerifyAccountController.verifyUserName)

routes.post('/signup', SessionsController.signup)
routes.post('/signin', SessionsController.signin)

// users - global

routes.get('/users/dashboard', URLDashboard.show, UserController.show)
routes.get('/users/follow', URLDashboard.show, FollowController.index)
routes.get('/users/publications', URLDashboard.show, PublicationsController.index)
routes.get('/users/publications/likes/:publicationId', LikesPublicationsController.index)
routes.get(
  '/users/publications/comments/:publicationId',
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
  '/user/action/publications/:publicationId',
  IsMailVerified.show,
  PublicationsController.destroy
)

routes.put(
  '/user/action/publications/:publicationId',
  IsMailVerified.show,
  PublicationsController.update
)

routes.post(
  '/user/action/comments/:publicationId',
  IsMailVerified.show,
  CommentsPublicationsController.store
)

routes.delete(
  '/user/action/comments/:commentId',
  IsMailVerified.show,
  CommentsPublicationsController.destroy
)

routes.post(
  '/user/action/commentary-comment/:commentId',
  IsMailVerified.show,
  CommentaryOfCommentsController.store
)

routes.delete(
  '/user/action/commentary-comment/:commentaryId',
  IsMailVerified.show,
  CommentaryOfCommentsController.destroy
)

routes.post(
  '/user/action/like/publication/:publicationId',
  IsMailVerified.show,
  LikesPublicationsController.store
)

routes.delete(
  '/user/action/like/publication/:publicationId',
  IsMailVerified.show,
  LikesPublicationsController.destroy
)

routes.post(
  '/user/action/like/comments/:commentId',
  IsMailVerified.show,
  LikesCommentsControllers.store
)

routes.delete(
  '/user/action/like/comments/:commentId',
  IsMailVerified.show,
  LikesCommentsControllers.destroy
)

routes.post(
  '/user/action/like/commentary-comment/:commentaryId',
  IsMailVerified.show,
  LikesCommentaryCommentsController.store
)

routes.delete(
  '/user/action/like/commentary-comment/:commentaryId',
  IsMailVerified.show,
  LikesCommentaryCommentsController.destroy
)

// web action

routes.get('/user/web-action/authenticated', Authorization.authenticated)

export default routes
