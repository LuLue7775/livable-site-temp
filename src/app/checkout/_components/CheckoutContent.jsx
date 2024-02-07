'use client'

import CheckoutEvents from './CheckoutEvents'
import CheckoutProducts from './CheckoutProducts'
import CheckoutTotal from './CheckoutTotal'
import useCommonMainAnimation from '@/utils/hooks/useCommonMainAnimation'

const CheckoutContent = ({ mainScopeRef }) => {
  useCommonMainAnimation({ mainScopeRef })

  return (
    <div ref={mainScopeRef} className='mt-4 flex h-auto w-full flex-col items-end overflow-hidden text-green-900'>
      <div
        className={
          'content-head relative h-[52px] w-full min-w-[350px] translate-x-12 justify-end md:w-[calc(100%-10px)]'
        }
      >
        <p
          style={{ opacity: 0 }}
          className='horizontal-line relative flex h-[52px] w-full border-t border-green-900/60'
        />
      </div>

      <div
        style={{ opacity: 0 }}
        className='content-body relative 
                  bottom-0 min-h-[600px] w-full min-w-[350px] 
                  translate-x-[-4px] translate-y-[1px] overflow-hidden border-l border-green-900/60 p-6 md:w-[calc(100%-10px)]'
      >
        <CheckoutProducts />
        <CheckoutEvents />
        <CheckoutTotal />

        <div className='inline-flex gap-4'>
          <a
            onClick={() => routerMiddleware.push('/service-policy')}
            className='cursor-pointer text-sm hover:text-red-400'
          >
            服務條款 SERVICE POLICY
          </a>
          <a
            onClick={() => routerMiddleware.push('/privacy-policy')}
            className='cursor-pointer text-sm hover:text-red-400'
          >
            隱私權政策 PRIVACY POLICY
          </a>
          <a
            onClick={() => routerMiddleware.push('/return-policy')}
            className='cursor-pointer text-sm hover:text-red-400'
          >
            退款政策 RETURN POLICY
          </a>
        </div>
      </div>
    </div>
  )
}
export default CheckoutContent
