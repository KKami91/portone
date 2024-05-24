import PortOne from "@portone/browser-sdk/v2";

interface Lecture {
  name: string;
  price: number;
}

const lectures = {
  LANG_BASIC: { name: "랭체인 기초 강의", price: 99000 },
  LANG_INTERMEDIATE: { name: "랭체인 중급 강의", price: 149000 },
  LANG_ADVANCED: { name: "랭체인 고급 강의", price: 199000 },
};

async function initiatePayment(event: Event) {
  const button = event.target as HTMLButtonElement;
  const lectureCode = button.dataset.lectureCode as keyof typeof lectures;
  
  if (!lectureCode || !(lectureCode in lectures)) {
    alert("유효하지 않은 강의 코드입니다.");
    return;
  }

  const lecture = lectures[lectureCode];
  const orderId = `order-${crypto.randomUUID()}`;

  const response = await PortOne.requestPayment({
    storeId: process.env.PORTONE_STORE_ID as string,
    channelKey: process.env.PORTONE_CHANNEL_KEY, 
    paymentId: `payment-${crypto.randomUUID()}`,
    orderName: lecture.name,
    totalAmount: lecture.price,
    currency: "CURRENCY_KRW",
    payMethod: "CARD",
  });
  
  if (response) {
    if (response.code != null) {
      alert(response.message);
      return;
    } else {
      // 결제 성공 시 처리
      const notified = await fetch('/payment/complete', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: response.paymentId,
          code: response.code,
          message: response.message,
          lectureCode: lectureCode, // html에서 강의에 맞는 코드
          lectureName: lecture.name, // 강의 이름
          lecturePrice: lecture.price, // 강의 가격
          orderId: orderId,
        }),})
      
      if (notified.status === 200) {
        // 서버에서 결제 검증 및 완료 처리가 성공한 경우
        console.log('Payment processed successfully:');
        const responseData = await notified.json();
        const newWindow = window.open('', '_blank', 'width=500, height=600');
        newWindow?.document.write(`
        <h2>결제 정보</h2>
        <p>결제 ID: ${responseData.payment.paymentId}</p>
        <p>주문 ID: ${orderId}</p>
        <p>결제 금액: ${responseData.payment.amount}</p>
        <p>결제 상태: ${responseData.payment.status}</p>
        `);
        newWindow?.document.write(`
        <botton onclick="window.close()">닫기</button>
        `)
      } else {
        // 서버에서 결제 검증 및 완료 처리가 실패한 경우
        console.error('Payment processing failed:');
      }
    }
  }
}

document.querySelectorAll(".pay-button").forEach((button) => {
  button.addEventListener("click", initiatePayment);
});