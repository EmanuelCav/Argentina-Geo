import { Router } from "express";

import * as categoriesCtrl from '../controller/category.ctrl';

import validRole from '../middleware/validation/role/validRole';
import validCategory from "../middleware/validation/location/valid.category";

import auth from '../middleware/auth/auth';

const router = Router()

router.get('/categories', auth, categoriesCtrl.categories)
router.post('/categories', [auth, validRole], validCategory, categoriesCtrl.createCategories)
router.delete('/categories/:id', [auth, validRole], categoriesCtrl.removeCategories)

export default router