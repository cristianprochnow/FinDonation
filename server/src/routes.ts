import { Router } from 'express'
import { CategoriesController } from '@controllers/CategoriesController'

const router = Router()

const categoriesController = new CategoriesController()

router.get('/donation/categories', categoriesController.index)

export { router }
