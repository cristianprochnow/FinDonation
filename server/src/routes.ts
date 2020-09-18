import { Router } from 'express'

import UsersController from '@controllers/UsersController'

const router = Router()

const usersController = new UsersController()

router.get('/users', usersController.index)
router.post('/users/login', usersController.logIn)
router.post('/users/signup', usersController.signUp)
router.get('/users/profile/:id', usersController.profile)
router.post('/users/deactivate/:id', usersController.deactivate)

export { router }
