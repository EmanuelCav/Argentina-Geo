import { Router } from "express";

import * as gameCtrl from '../controller/game.ctrl';

import auth from '../middleware/auth/auth';
import validRole from '../middleware/validation/role/validRole';

const router = Router()

router.get('/games', auth, gameCtrl.games)
router.get('/games/:id', auth, gameCtrl.game)
router.post('/games', auth, gameCtrl.createGames)
router.delete('/games/:id', [auth, validRole], gameCtrl.removeGames)

export default router