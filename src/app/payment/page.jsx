import EcpayForm from './EcpayForm'
import { cookies } from 'next/headers'
import { Merchant, CreditOneTimePayment } from 'node-ecpay-aio'

async function genEcpayHTML() {
  // 'use server'
  const cookieStore = cookies()
  const paymentSession = cookieStore.get('PaymentSession').value

  const checkoutForm = await createEcpayFormAPI(paymentSession)
  return checkoutForm
}

const PaymentPage = async () => {
  //   const html = use(genEcpayHTML())
  const html = await genEcpayHTML()
  return <EcpayForm html={html} />
}
export default PaymentPage

async function createEcpayFormAPI(data) {
  // console.log('NEXT_PUBLIC_ECPAY_HASHKEY process.env ================== ', process.env.NEXT_PUBLIC_ECPAY_HASHKEY)
  // console.log('NEXT_PUBLIC_ECPAY_HASHIV process.env ================== ', process.env.NEXT_PUBLIC_ECPAY_HASHIV)

  const firebase_url = 'https://asia-east1-the-livable.cloudfunctions.net/payReturnSuccess'

  const merchant = new Merchant(
    'Production', 
    // 'Test', // 測試用
    {
        MerchantID: '3302635',
        HashKey: process.env.NEXT_PUBLIC_ECPAY_HASHKEY,
        HashIV: process.env.NEXT_PUBLIC_ECPAY_HASHIV,
      // MerchantID: '3002607', // 測試用
      // HashKey: 'pwFHCqoQZGmho4w6',
      // HashIV: 'EkRm7iFT261dpevs',

      OrderResultURL: `https://thelivablestudio.com`, // 下單成功後
      ClientBackURL: `https://thelivablestudio.com/checkout`, // 取消下單返回處
      ReturnURL: firebase_url, // 回給fire functions
    },
  )

  const formData = await JSON.parse(data)
  const baseParams = {
    MerchantTradeNo: formData.orderId, //uid
    MerchantTradeDate: formData.createdAt.toString(),
    PaymentType: 'aio',
    TotalAmount: formData.total,
    TradeDesc: '交易描述',
    ItemName: formData.line_items,
    EncryptType: 1,
  }

  const params = {
    BindingCard: 0, // 記憶信用卡: 1 (記) | 0 (不記)
    UnionPay: 2, // [需申請] 銀聯卡: 0 (可用, default) | 1 (導至銀聯網) | 2 (不可用)
  }

  const payment = merchant.createPayment(CreditOneTimePayment, baseParams, params)

  return await payment.checkout()
}
