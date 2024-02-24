import { Router } from "express";

import * as usersCtrl from '../controller/users.ctrl';

import validRole from '../middleware/validation/role/validRole';
import auth from '../middleware/auth/auth';

import validCreateUser from '../middleware/validation/user/validCreateUser';
import validLogin from '../middleware/validation/user/validLogin';
import validRegister from '../middleware/validation/user/validRegister';
import validOptions from "../middleware/validation/user/validOptions";
import validPassword from "../middleware/validation/user/validPassword";
import validNickname from "../middleware/validation/user/validNickname";

const router = Router()

router.get('/users/ranking/:date', auth, usersCtrl.users)
router.get('/users/:id', auth, usersCtrl.user)
router.get('/login/:id', usersCtrl.getLogin)
router.get('/users/experience/date', auth, usersCtrl.getDate)
router.get('/users/location/:location/date/:date', auth, usersCtrl.groupUsers)

router.post('/users', [auth, validRole], validCreateUser, usersCtrl.createUser)
router.post('/users/login', validLogin, usersCtrl.login)
router.post('/users/register', validRegister, usersCtrl.register)
router.post('/users/first', usersCtrl.firstTime)

router.delete('/users/:id', [auth, validRole], usersCtrl.removeUser)

router.patch('/users/options/:id', auth, validOptions, usersCtrl.updateOptions)
router.patch('/users/category/:id', auth, usersCtrl.updateCategory)

router.put('/users/password/:id', auth, validPassword, usersCtrl.updatePassword)
router.put('/users/nickname/:id', auth, validNickname, usersCtrl.updateNickname)
router.put('/users/location/:id', auth, usersCtrl.updateLocation)
router.put('/users/experience', auth, usersCtrl.updateExperience)
router.put('/users/category', auth, usersCtrl.allCategory)
router.put('/users/helps/:type', auth, usersCtrl.updateHelps)

export default router