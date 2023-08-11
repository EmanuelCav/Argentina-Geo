import { Router } from "express";

import * as imagesCtrl from '../controller/image.ctrl';

const router = Router()

router.get('/images', imagesCtrl.images)
router.delete('/images/:id', imagesCtrl.removeImage)

export default router