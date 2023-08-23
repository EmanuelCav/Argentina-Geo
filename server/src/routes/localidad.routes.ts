import { Router } from "express";

import * as locationCtrl from '../controller/location.ctrl'

const router = Router()

router.get('/paises', locationCtrl.paises)
router.get('/provincias', locationCtrl.provincias)
router.get('/municipios', locationCtrl.municipios)
router.post('/localidades', locationCtrl.createLocalidad)

export default router