import { Request, Response } from 'express';

export async function complete(req: Request, res: Response) {
  if (req.method === 'POST') {
    try {
      const { paymentId, orderId } = req.body;
      const paymentResponse = await fetch(
        `https://api.portone.io/payments/${paymentId}`,
        { headers: { Authorization: `PortOne ${process.env.PORTONE_SECRET_KEY}` } }
      );
      if (!paymentResponse.ok) {
        throw new Error(`paymentResponse: ${paymentResponse.statusText}`);
      }
      const payment = await paymentResponse.json();
      const lectureInformation = payment.pgResponse;
      const order = await findOrderById(orderId, lectureInformation);
      if (order.amount === payment.amount.total) {
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
  console.log('-----------------complete end--------------')
  
}

async function findOrderById(orderId: string, lectureInformation: any) {
  // 예시로 더미 데이터를 반환
  return {
    id: 'orderId',
    amount: 1000,
  };
}