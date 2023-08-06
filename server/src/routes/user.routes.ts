import { Router } from "express";

import * as usersCtrl from '../controller/users.ctrl';

import validCreateUser from '../middleware/validation/user/validCreateUser';

const router = Router()

router.get('/users', usersCtrl.users)
router.get('/users/:id', usersCtrl.user)
router.post('/users', validCreateUser, usersCtrl.createUser)
router.post('/users/login', usersCtrl.login)
router.post('/users/register', usersCtrl.register)
router.delete('/users/:id', usersCtrl.removeUser)

export default router