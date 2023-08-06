import { Router } from "express";

import * as usersCtrl from '../controller/users.ctrl';

import validRole from '../middleware/validation/role/validRole';

import validCreateUser from '../middleware/validation/user/validCreateUser';
import validLogin from '../middleware/validation/user/validLogin';
import validRegister from '../middleware/validation/user/validRegister';

import auth from '../middleware/auth/auth';

const router = Router()

router.get('/users', usersCtrl.users)
router.get('/users/:id', usersCtrl.user)
router.post('/users', [auth, validRole], validCreateUser, usersCtrl.createUser)
router.post('/users/login', validLogin, usersCtrl.login)
router.post('/users/register', validRegister, usersCtrl.register)
router.delete('/users/:id', [auth, validRole], usersCtrl.removeUser)

export default router