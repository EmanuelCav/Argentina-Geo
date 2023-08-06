import { Router } from "express";

import * as rolesCtrl from '../controller/roles.ctrl';

import validCreateRole from '../middleware/validation/role/validCreateRole';

const router = Router()

router.get('/roles', rolesCtrl.roles)
router.post('/roles', validCreateRole, rolesCtrl.createRole)
router.delete('/roles/:id', rolesCtrl.removeRole)

export default router