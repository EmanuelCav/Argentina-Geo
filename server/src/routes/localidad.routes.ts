import { Router } from "express";

import * as locationCtrl from '../controller/location.ctrl'

const router = Router()

router.get('/paises', locationCtrl.paises)
router.get('/provincias/:pais', locationCtrl.provincias)
router.get('/municipios/:provincia', locationCtrl.municipios)
router.post('/localidades', locationCtrl.createLocalidad)
router.delete('/localidades/:id', locationCtrl.removeLocalidad)

export default router