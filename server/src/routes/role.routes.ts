import { Router } from "express";

import * as rolesCtrl from '../controller/roles.ctrl';

import validRole from '../middleware/validation/role/validRole';
import auth from '../middleware/auth/auth';

import validCreateRole from '../middleware/validation/role/validCreateRole';

const router = Router()

router.get('/roles', [auth, validRole], rolesCtrl.roles)

router.post('/roles', [auth, validRole], validCreateRole, rolesCtrl.createRole)

router.delete('/roles/:id', [auth, validRole], rolesCtrl.removeRole)

export default router