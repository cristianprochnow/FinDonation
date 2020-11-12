import { Router } from 'express'
import multer from 'multer'

import multerConfig from '@config/multer'

import UsersController from '@controllers/UsersController'
import ItemCategoryController from '@controllers/ItemCategoryController'
import DonationsController from '@controllers/DonationsController'
import UsersMiddleware from '@middlewares/UsersMiddleware'

const router = Router()

const upload = multer(multerConfig)

const usersController = new UsersController()
const itemsCategoryController = new ItemCategoryController()
const donationsController = new DonationsController()
const usersMiddleware = new UsersMiddleware()

router.get('/users', usersController.index)
router.post('/users/login', usersController.logIn)
router.post(
  '/users/signup',
  upload.single('avatar'),
  usersController.signUp
)
router.get(
  '/users/profile/:id',
  usersMiddleware.verifyToken,
  usersController.profile
)
router.put(
  '/users/update/:id',
  usersMiddleware.verifyToken,
  upload.single('avatar'),
  usersController.update
)
router.patch(
  '/users/deactivate/:id',
  usersMiddleware.verifyToken,
  usersController.deactivate
)

router.get(
  '/user/donations/:userId',
  usersMiddleware.verifyToken,
  donationsController.donationsByUser
)

router.get('/items', itemsCategoryController.index)

router.get('/donations', donationsController.index)
router.get(
  '/donations/details/:id',
  usersMiddleware.verifyToken,
  donationsController.details
)
router.post(
  '/donations/create',
  usersMiddleware.verifyToken,
  upload.single('image'),
  donationsController.create
)
router.put(
  '/donations/update/:id',
  usersMiddleware.verifyToken,
  upload.single('image'),
  donationsController.update
)
router.delete(
  '/donations/delete/:id',
  usersMiddleware.verifyToken,
  donationsController.delete
)

export { router }
