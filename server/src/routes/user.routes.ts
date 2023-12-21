import { Router } from "express";

import * as usersCtrl from '../controller/users.ctrl';
import * as levelsCtrl from '../controller/level.ctrl';

import validRole from '../middleware/validation/role/validRole';

import validCreateUser from '../middleware/validation/user/validCreateUser';
import validLogin from '../middleware/validation/user/validLogin';
import validRegister from '../middleware/validation/user/validRegister';
import validOptions from "../middleware/validation/user/validOptions";
import validLevel from "../middleware/validation/user/validLevel";
import validPassword from "../middleware/validation/user/validPassword";
import validNickname from "../middleware/validation/user/validNickname";

import auth from '../middleware/auth/auth';

const router = Router()

// router.get('/users/ranking/:date', auth, usersCtrl.users)
router.get('/users/ranking/:date', usersCtrl.users)
router.get('/users/:id', auth, usersCtrl.user)
router.get('/login/:id', usersCtrl.getLogin)
router.post('/users', [auth, validRole], validCreateUser, usersCtrl.createUser)
router.post('/users/login', validLogin, usersCtrl.login)
router.post('/users/register', validRegister, usersCtrl.register)
router.post('/users/first', usersCtrl.firstTime)
// router.delete('/users/:id', [auth, validRole], usersCtrl.removeUser)
router.delete('/users/:id', usersCtrl.removeUser)
router.patch('/users/options/:id', auth, validOptions, usersCtrl.updateOptions)
router.patch('/users/category/:id', auth, usersCtrl.updateCategory)
router.put('/users/password/:id', auth, validPassword, usersCtrl.updatePassword)
router.put('/users/nickname/:id', auth, validNickname, usersCtrl.updateNickname)
router.put('/users/location/:id', auth, usersCtrl.updateLocation)
router.patch('/users/category/unlock/:id', auth, usersCtrl.unlockCategory)
router.put('/users/experience/:id', auth, usersCtrl.updateExperience)
router.get('/users/experience/date', auth, usersCtrl.getDate)

// router.get('/levels', [auth, validRole], validLevel, levelsCtrl.levels)
router.get('/levels', levelsCtrl.levels)
// router.post('/levels', [auth, validRole], validLevel, levelsCtrl.createLevels)
router.post('/levels', validLevel, levelsCtrl.createLevels)
// router.post('/levels', [auth, validRole], validLevel, levelsCtrl.createLevels)
router.put('/levels/:id', levelsCtrl.updateLevels)

export default router