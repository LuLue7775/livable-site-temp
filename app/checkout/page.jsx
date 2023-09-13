import Footer from '@/components/Footer'
import CheckoutForm from './CheckoutForm'
import CheckoutFormProvider from './CheckoutFormProvider'
import CheckoutContent from './CheckoutContent'
export default function page() {
  return (
    <CheckoutFormProvider>
      <div className='relative h-[calc(100vh-64px)] text-green-900'>
        <main className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='flex justify-start md:justify-end col-span-1 md:col-span-1'>
            <CheckoutForm />
            {/** @TODO POLICIES */}
          </div>
          <div className='w-full md:col-span-2 col-span-1 '>
            <CheckoutContent/>
          </div>
        </main>
        {/* <Footer></Footer> */}
      </div>
    </CheckoutFormProvider>
  )
}
