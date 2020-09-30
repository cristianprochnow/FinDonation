import { Router } from 'express'

import UsersController from '@controllers/UsersController'
import UsersMiddleware from '@middlewares/UsersMiddleware'

import ItemCategoryController from '@controllers/ItemCategoryController'

import DonationsController from '@controllers/DonationsController'

const router = Router()

const usersController = new UsersController()
const usersMiddleware = new UsersMiddleware()

const itemsCategoryController = new ItemCategoryController()

const donationsController = new DonationsController()

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

router.get('/donations', donationsController.index)
router.get('/donations/details/:id', donationsController.details)
router.post(
  '/donations/create',
  usersMiddleware.verifyToken,
  donationsController.create
)
router.post(
  '/donations/update/:id',
  usersMiddleware.verifyToken,
  donationsController.update
)

export { router }
