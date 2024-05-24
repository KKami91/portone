// import axios from 'axios';
// import { SECRET_KEY } from '../config';

// export default async function verifyAndCompletePayment(req: Request, res: Response) {
//   if (req.method === 'POST') {
//     try {
//       const { paymentId:, orderId, amount } = req.body;
//       const paymentResponse = await fetch(
//         `https://api.portone.io/payments/${paymentId}`,
//         // PORTONE_API_SECRET api keys v2 secret key
//         { headers: { Authorization: `PortOne ${process.env.NEXT_PUBLIC_PORTONE_SECRET_KEY}` } }
//       );
//       if (!paymentResponse.od) {
//         throw new Error(`paymentResponse: ${paymentResponse.statusText}`);
//       }
//       const payment = await paymentResponse.json();
//       const order = await findOrderById(orderId);
//       if (order.amount === payment.amount.total) {
//         console.log('payment.amount.total', payment.amount.total);
//         console.log('payment.status', payment.status);
//         switch (payment.status) {
//           case 'VIRTUAL_ACCOUNT_ISSUED':
//             break;
//           case 'PAID':
//             break;
//         }
//       } else { 
//         console.log('일치 X');
//         throw new Error('Payment amount mismatch');
//       }
//       res.status(200).json({
//         message: 'Payment processed succesfully',
//         payment: {
//           paymentId: payment.paymendId,
//           amount: payment.amount.total,
//           status: payment.status,
//         },
//       });
//     } catch (error) {
//       res.status(400).json({ message: 'Payment processing failed'});
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }


// async function findOrderById(orderId: string) {
//   // 실제 주문 정보를 가져오는 로직을 구현해야 합니다.
//   // 여기서는 예시로 더미 데이터를 반환합니다.
//   return { id: orderId, amount: 1000 };
// }

// // export const verifyAndCompletePayment = async (
// //     paymentId: string,
// //     orderId: string,
// //     amount: number
// //   ): Promise<{
// //     success: boolean;
// //     message: string;
// //     //payment?: any;
// //     orderId?: string;
// //     orderStatus?: string;
// //   }> => {
// //   try {
// //     // 포트원 API를 사용하여 결제 정보 조회
// //     console.log('In paymentService.................. and before response--------------');
// //     console.log('paymentService.ts ------ paymentId: ', paymentId);
// //     console.log('process.env.PORTONE_SECRET_KEY', process.env.PORTONE_SECRET_KEY);
// //     console.log('SECRET_KEY', SECRET_KEY);
// //     const paymentResponse = await fetch(
// //       `https://api.portone.io/payments/${paymentId}`,
// //       // PORTONE_API_SECRET api keys v2 secret key
// //       { headers: { Authorization: `PortOne ${process.env.PORTONE_SECRET_KEY}` } }
// //     );
// //     if (!paymentResponse.ok)
// //       throw new Error(`paymentResponse: ${paymentResponse.statusText}`);
// //     const payment = await paymentResponse.json();
// //     //console.log(payment.status)

// //     if (payment.status === 200) {
// //       // 주문 정보 조회
// //       console.log('in paymentService if 200??')
// //       const order = await findOrderById(orderId);

// //       // 결제 금액 검증
// //       if (order.amount === payment.amount.total) {
// //         switch (payment.status) {
// //           case "VIRTUAL_ACCOUNT_ISSUED":
// //             // 가상 계좌가 발급된 상태입니다.
// //             // 계좌 정보를 이용해 원하는 로직을 구성하세요.
// //             break;
// //           case "PAID":
// //             // 모든 금액을 지불했습니다! 완료 시 원하는 로직을 구성하세요.
// //             const updatedOrder = await updateOrderStatus(orderId, "결제 완료");
// //             return {
// //               success: true,
// //               message: 'Payment verified and completed',
// //               payment: {
// //                 paymentId: payment.paymentId,
// //                 amount: payment.amount.total,
// //                 status: payment.status,
// //               },
// //               orderId: updatedOrder.id,
// //               orderStatus: updatedOrder.status
// //             };
// //             break;
// //         }

// //         return {
// //           success: true,
// //           message: 'Payment verified and completed',
// //           payment: {
// //             paymentId: payment.paymentId,
// //             amount: payment.amount.total,
// //             status: payment.status,
// //           },
// //         };
// //       } else {
// //         // 결제 금액이 불일치하여 위/변조 시도가 의심됩니다.
// //         return { success: false, message: 'Payment amount mismatch' };
// //       }
// //     } else {
// //       return { success: false, message: 'Payment verification failed' };
// //     }
// //   } catch (error) {
// //     console.error('Error during payment verification:', error);
// //     return { success: false, message: 'Payment verification failed' };
// //   }
// // };

// // // 주문 정보를 가져오는 함수 (예시)
// // async function findOrderById(orderId: string) {
// //   // 실제 주문 정보를 가져오는 로직을 구현해야 합니다.
// //   // 여기서는 예시로 더미 데이터를 반환합니다.
// //   return { id: orderId, amount: 1000 };
// // }

// // async function updateOrderStatus(orderId: string, status: string): Promise<{ id: string; status: string }> {
// //     // 실제 주문 상태를 업데이트하는 로직을 구현해야 합니다.
// //     // 여기서는 예시로 업데이트된 주문 정보를 반환합니다.
// //     return { id: orderId, status };
// //   }