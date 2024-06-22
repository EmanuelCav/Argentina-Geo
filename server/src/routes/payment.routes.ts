import { Router } from 'express';

const router = Router()

import * as paymentCtrl from '../controller/payment.ctrl';

import auth from '../middleware/auth/auth';

router.post('/payments/tents/:id', auth, paymentCtrl.orderPayment)
router.get('/payments/success', auth, paymentCtrl.successPayment)
router.get('/payments/pending', auth, paymentCtrl.pendingPayment)
router.get('/payments/failure', auth, paymentCtrl.failurePayment)
router.post('/payments/webhook/tents/:id', auth, paymentCtrl.webhookPayment)

export default router