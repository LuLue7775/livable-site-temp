import Footer from '@/components/Footer'
import CheckoutForm from './_components/CheckoutForm'
import CheckoutContent from './_components/CheckoutContent'
import CheckoutFormProvider from './_components/CheckoutFormProvider'

export const metadata = {
  title: 'The Livable Studio Checkout Page',
  description: 'Checkout Page for The Livable Studio.',
}

const CheckoutPage = () => {
  return (
    <CheckoutFormProvider>
      <div className='relative h-full w-full translate-y-16 text-green-900'>
        <main className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div className='col-span-1 flex justify-start md:col-span-1 md:justify-end'>
            <CheckoutForm />
            {/** @TODO POLICIES */}
          </div>
          <div className='col-span-1 w-full md:col-span-2 '>
            <CheckoutContent />
          </div>
        </main>
        {/* <Footer></Footer> */}
      </div>
    </CheckoutFormProvider>
  )
}
export default CheckoutPage
