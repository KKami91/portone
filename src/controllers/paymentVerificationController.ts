// import { Request, Response } from 'express';
// //import * as paymentService from '../services/paymentService';

// export const verifyPayment = async (req: Request, res: Response) => {
//   const { paymentId, orderId, amount } = req.body;
//   try {
//     // 결제 검증 및 완료 처리
//     console.log('======================== in paymentVerificationController before service===============');
//     const result = await paymentService.verifyAndCompletePayment(paymentId, orderId, amount);
//     console.log('======================== in paymentVerificationController after service===============');
//     console.log('result---->', result);
//     console.log('======================== =====================================');
//     res.json(result);
//   } catch (error) {
//     console.error('Payment verification failed:', error);
//     res.status(500).json({ success: false, message: 'Payment verification failed' });
//   }
// };