import { Router } from "express";

import * as gameCtrl from '../controller/game.ctrl';

const router = Router()

router.get('/games', gameCtrl.games)
router.get('/games/:id', gameCtrl.game)
router.post('/games', gameCtrl.createGames)
router.delete('/games/:id', gameCtrl.removeGames)

export default router