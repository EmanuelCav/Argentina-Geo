import { Router } from 'express';

const router = Router()

import * as tentCtrl from '../controller/tent.ctrl';

import auth from '../middleware/auth/auth';
import validRole from '../middleware/validation/role/validRole';

router.get('/tents', auth, tentCtrl.tents)
router.post('/tents', [auth, validRole], tentCtrl.createTents)

export default router