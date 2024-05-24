import { Request, Response } from 'express';

const lectures: { [key: string]: { name: string; price: number } } = {
  LANG_BASIC: { name: "랭체인 기초 강의", price: 99000 },
  LANG_INTERMEDIATE: { name: "랭체인 중급 강의", price: 149000 },
  LANG_ADVANCED: { name: "랭체인 고급 강의", price: 199000 },
};

export async function complete(req: Request, res: Response) {
  if (req.method === 'POST') {
    try {
      const { paymentId, orderId, lectureCode, lectureName, lecturePrice } = req.body;
      const paymentResponse = await fetch(
        `https://api.portone.io/payments/${paymentId}`,
        { headers: { Authorization: `PortOne ${process.env.PORTONE_SECRET_KEY}` } }
      );
      if (!paymentResponse.ok) {
        throw new Error(`paymentResponse: ${paymentResponse.statusText}`);
      }
      const payment = await paymentResponse.json();
      const order = await findOrderById(orderId, lectureName, lecturePrice);
      if (order.amount === payment.amount.total && order.lectureName === payment.orderName) {
        switch (payment.status) {
          case "VIRTUAL_ACCOUNT_ISSUED":
            // 가상 계좌가 발급된 상태
            break;
          case "PAID":
            // 모든 금액을 지불
            break;
        }
      } else {
        // 결제 금액이 불일치하여 위/변조 시도가 의심
        throw new Error('Payment amount mismatch');
      }
      res.status(200).json({ 
        message: 'Payment processed successfully',
        payment: {
            paymentId: payment.id,
            amount: payment.amount.total,
            status: payment.status,
        },
       });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Payment processing failed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
  
  
}
async function findOrderById(orderId: string, lectureName: string, lecturePrice: number) {

  if (!orderId) {
    throw new Error('Invalid lecture code');
  }

  return {
    lectureName: lectureName,
    amount: lecturePrice
  };
}