import { Router } from "express";

import * as provincasCtrl from '../controller/provincias.ctrl';

import validRole from '../middleware/validation/role/validRole';
import validProvincia from '../middleware/validation/location/validProvincia';

import auth from '../middleware/auth/auth';

import { upload } from '../helper/multer';

const router = Router()

router.get('/provincias', provincasCtrl.provincias)
router.get('/provincias/:id', provincasCtrl.provincia)
router.post('/provincias', [auth, validRole], validProvincia, upload.array("files", 10), provincasCtrl.createProvincia)
router.delete('/provincias/:id', [auth, validRole], provincasCtrl.removeProvincia)

export default router