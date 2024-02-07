// import Footer from '@/components/Footer'

import Checkout from './_components/Checkout'
import CheckoutFormProvider from './_components/CheckoutFormProvider'

export const metadata = {
  title: 'The Livable Studio Checkout Page',
  description: 'Checkout Page for The Livable Studio.',
}

const CheckoutPage = () => {
  return (
    <CheckoutFormProvider>
      <div className='relative h-full w-full translate-y-16 text-green-900'>
        <Checkout />
        {/* <Footer></Footer> */}
      </div>
    </CheckoutFormProvider>
  )
}
export default CheckoutPage
