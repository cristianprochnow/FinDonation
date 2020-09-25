import { Router } from 'express'

import UsersController from '@controllers/UsersController'
import UsersMiddleware from '@middlewares/UsersMiddleware'

const router = Router()

const usersController = new UsersController()
const usersMiddleware = new UsersMiddleware()

router.get('/users', usersController.index)
router.post('/users/login', usersController.logIn)
router.post('/users/signup', usersController.signUp)
router.get(
  '/users/profile/:id',
  usersMiddleware.verifyToken,
  usersController.profile
)
router.post(
  '/users/update/:id',
  usersMiddleware.verifyToken,
  usersController.update
)
router.post(
  '/users/deactivate/:id',
  usersMiddleware.verifyToken,
  usersController.deactivate
)

export { router }
