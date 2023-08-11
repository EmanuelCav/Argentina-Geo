import { Router } from "express";

import * as municipiosCtrl from '../controller/municipios.ctrl';

import validRole from '../middleware/validation/role/validRole';

import auth from '../middleware/auth/auth';

import { upload } from '../helper/multer';

const router = Router()

router.get('/municipios', municipiosCtrl.municipios)
router.get('/municipios/:id', municipiosCtrl.municipio)
router.post('/municipios', [auth, validRole], upload.array("files", 10), municipiosCtrl.createMunicipio)
router.delete('/municipios/:id', [auth, validRole], municipiosCtrl.removeMunicipio)

export default router