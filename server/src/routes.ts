import { Router } from 'express'

import UsersController from '@controllers/UsersController'
import UsersMiddleware from '@middlewares/UsersMiddleware'

import ItemCategoryController from '@controllers/ItemCategoryController'

const router = Router()

const usersController = new UsersController()
const usersMiddleware = new UsersMiddleware()

const itemsCategoryController = new ItemCategoryController()

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

router.get('/items', itemsCategoryController.index)

export { router }
