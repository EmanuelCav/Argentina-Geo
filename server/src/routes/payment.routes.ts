import { Router } from 'express';

const router = Router()

import * as paymentCtrl from '../controller/payment.ctrl';

import auth from '../middleware/auth/auth';

router.get('/payments/tents/:id', auth, paymentCtrl.orderPayment)

export default router