import { Router } from 'express';
import { complete } from '../controllers/paymentController';

const router = Router();

router.post('/complete', complete)

export default router;