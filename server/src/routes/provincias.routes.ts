import { Router } from "express";

import * as provincasCtrl from '../controller/provincias.ctrl';

const router = Router()

router.get('/provincias', provincasCtrl.provincias)
router.get('/provincias/:id', provincasCtrl.provincia)
router.post('/provincias', provincasCtrl.createProvincia)
router.delete('/provincias/:id', provincasCtrl.removeProvincia)

export default router