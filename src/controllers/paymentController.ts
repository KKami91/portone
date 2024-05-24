import { Request, Response } from 'express';

export async function complete(req: Request, res: Response) {
  if (req.method === 'POST') {
    try {
      const { paymentId, orderId } = req.body;
      const paymentResponse = await fetch(
        `https://api.portone.io/payments/${paymentId}`,
        // PORTONE_API_SECRET api keys v2 secret key
        { headers: { Authorization: `PortOne ${process.env.PORTONE_SECRET_KEY}` } }
      );
      if (!paymentResponse.ok) {
        throw new Error(`paymentResponse: ${paymentResponse.statusText}`);
      }
      const payment = await paymentResponse.json();
      console.log('------------------------');
      console.log(payment);
      console.log('------------------------');
      console.log('payment.lecture', payment.lecture);
      console.log('payment.lectures', payment.lectures);
      const lectureInformation = payment.pgResponse;
      const order = await findOrderById(orderId, lectureInformation);
      if (order.amount === payment.amount.total) {
        switch (payment.status) {
          case "VIRTUAL_ACCOUNT_ISSUED":
            // 가상 계좌가 발급된 상태입니다.
            // 계좌 정보를 이용해 원하는 로직을 구성하세요.
            break;
          case "PAID":
            // 모든 금액을 지불했습니다! 완료 시 원하는 로직을 구성하세요.
            break;
        }
      } else {
        // 결제 금액이 불일치하여 위/변조 시도가 의심됩니다.
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
  // 실제 주문 정보를 가져오는 로직을 구현해야 합니다.
  // 여기서는 예시로 더미 데이터를 반환합니다.
  return {
    id: 'orderId',
    amount: 1000,
  };
}