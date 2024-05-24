import { Router } from 'express';
//import { paymentSuccess, paymentFail } from '../controllers/paymentController';
import { complete } from '../controllers/paymentController';
//import { verifyPayment } from '../controllers/paymentVerificationController';

const router = Router();

//router.post('/success', paymentSuccess);
//router.get('/fail', paymentFail);
//router.post('/verify', verifyPayment);
router.post('/complete', complete)

export default router;