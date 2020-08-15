import { Router } from 'express'

import SessionsController from '@UsersControllers/SessionsController'
import UserController from '@UsersControllers/UserController'
import FollowingController from '@UsersControllers/FollowingController'
import FollowersController from '@UsersControllers/FollowersController'

import PublicationsController from '@PublicationsControllers/PublicationsController'
import HomePublicationsController from '@PublicationsControllers/HomePublicationsController'
import GlobalPublicationsController from '@PublicationsControllers/GlobalPublicationsController'

import LikesPublicationsController from '@LikesControllers/LikesPublicationsController'
import LikesCommentsControllers from '@LikesControllers/LikesCommentsControllers'
import LikesCommentsOfCommentController from '@LikesControllers/LikesCommentsOfCommentController'

import CommentsPublicationsController from '@CommentsControllers/CommentsPublicationsController'
import CommentsOfCommentsController from '@CommentsControllers/CommentsOfCommentsController'

import VerifyAccountController from '@WebControllers/VerifyAccountController'
import WebAuthController from '@WebControllers/WebAuthController'

import Authorization from './auth/middlewares/Authorization'
import isMailVerified from './middlewares/isMailVerified'
import URLDashboard from './middlewares/URLDashboard'

const routes = Router()

const sessions = new SessionsController()
const user = new UserController()
const following = new FollowingController()
const followers = new FollowersController()

const publications = new PublicationsController()
const HomePublications = new HomePublicationsController()
const GlobalPublications = new GlobalPublicationsController()

const CommentsPublications = new CommentsPublicationsController()
const CommentsOfComments = new CommentsOfCommentsController()

const LikesPublications = new LikesPublicationsController()
const LikesComments = new LikesCommentsControllers()
const LikesCommentsOfComment = new LikesCommentsOfCommentController()

const verify = new VerifyAccountController()
const webAuth = new WebAuthController()

routes.get('/verify-email-account', verify.verifyEmail)
routes.get('/verify-username-account', verify.verifyUserName)

routes.post('/signup', sessions.signup)
routes.post('/signin', sessions.signin)

// users - global

routes.get('/users/dashboard', URLDashboard, user.show)
routes.get('/users/following', URLDashboard, following.index)
routes.get('/users/followers', URLDashboard, followers.index)
routes.get('/users/publications', URLDashboard, publications.index)
routes.get('/users/publications/likes/:PublicationId', LikesPublications.index)
routes.get('/users/publications/comments/:PublicationId', CommentsPublications.index)

// retirar
routes.get('/users/sql', user.sql)

// user - private

routes.use('/user', Authorization)

routes.get('/user/home/publications', HomePublications.index)
routes.get('/user/explore/publications', GlobalPublications.index)

routes.put('/user/update-account', user.update)
routes.put('/user/confirm-account/:code', webAuth.confirmAccount)

// user actions

routes.post('/user/action/following/:followId', isMailVerified, following.store)
routes.delete('/user/action/following/:followId', isMailVerified, following.destroy)

routes.post('/user/action/publications', isMailVerified, publications.store)
routes.delete('/user/action/publications/:PublicationId', isMailVerified, publications.destroy)

routes.post('/user/action/comments/:PublicationId', isMailVerified, CommentsPublications.store)
routes.delete('/user/action/comments/:CommentId', isMailVerified, CommentsPublications.destroy)

routes.post('/user/action/comments-comments/:CommentId', isMailVerified, CommentsOfComments.store)
routes.delete('/user/action/comments-comments/:CommentFromCommentsId', isMailVerified, CommentsOfComments.destroy)

routes.post('/user/action/like/publication/:PublicationId', isMailVerified, LikesPublications.store)
routes.delete('/user/action/like/publication/:LikeId', isMailVerified, LikesPublications.destroy)

routes.post('/user/action/like/comments/:CommentId', isMailVerified, LikesComments.store)
routes.delete('/user/action/like/comments/:LikeId', isMailVerified, LikesComments.destroy)

routes.post('/user/action/like/comments-comment/:CommentCommentId', isMailVerified, LikesCommentsOfComment.store)
routes.delete('/user/action/like/comments-comment/:LikeId', isMailVerified, LikesCommentsOfComment.destroy)

routes.post('/user/action/resend-code', webAuth.resendCode)

// web action

routes.get('/user/web-action/authenticated', webAuth.authenticated)

export default routes
