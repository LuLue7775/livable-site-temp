'use client'
import Button from '@/components/Button'
import { useCart } from '@/context/cartContext'
// import { useQuery } from '@tanstack/react-query'

const CheckoutTotal = () => {
  const { calculateCartTotal } = useCart()
  const total = calculateCartTotal()

  /**@TODO  useMutation on checkout */
  return (
    <div className='text-right'>
      <p className='w-full border-t' />
      <p>{total.productTotal ? `商品 product total: ${total.productTotal}` : ''}</p>
      <p>活動報名 event fee: {total.eventTotal}</p>
      <p>總計 Total: {total.eventTotal + total.productTotal}</p>
      <Button> Checkout </Button>
    </div>
  )
}
export default CheckoutTotal
