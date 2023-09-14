import Footer from '@/components/Footer'
import CheckoutForm from './CheckoutForm'
import CheckoutFormProvider from './CheckoutFormProvider'
import CheckoutContent from './CheckoutContent'
export default function page() {
  return (
    <CheckoutFormProvider>
      <div className='relative h-full w-full translate-y-16 text-green-900'>
        <main className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div className='col-span-1 flex justify-start md:col-span-1 md:justify-end'>
            <CheckoutForm />
            {/** @TODO POLICIES */}
          </div>
          <div className='col-span-1 w-full md:col-span-2 '>
            <CheckoutContent/>
          </div>
        </main>
        {/* <Footer></Footer> */}
      </div>
    </CheckoutFormProvider>
  )
}
