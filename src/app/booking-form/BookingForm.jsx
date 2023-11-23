'use client'
import { bookingSchema } from '@/utils/schemas'
import { useCart } from '@/providers/cartContext'
import { useState, useRef, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useDateFormatter } from 'react-aria'
import { Input } from '@/components/Input'
import Button from '@/components/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { eventpage_revealXAnimation, eventpage_revealYAnimation } from '@/utils/animations'
import useDelayRouting from '@/utils/hooks/useDelayRouting'
import gsap from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
gsap.registerPlugin(CSSRulePlugin)

export default function BookingForm() {
  const routerMiddleware = useDelayRouting()

  const horizontalRef = useRef()
  const eventBodyRef = useRef()
  useEffect(() => {
    if (!horizontalRef.current) return
    let diagonalPseudo = CSSRulePlugin.getRule('.event-item-head::before') //get pseudo element
    eventpage_revealXAnimation({ horizontalLine: horizontalRef.current })
    eventpage_revealYAnimation({ diagonal: diagonalPseudo, vertical: eventBodyRef.current })
  }, [])

  const router = useRouter()

  const [status, setStatus] = useState('idle')

  const searchParams = useSearchParams()
  const time = searchParams?.get('time')
  const eventEn = searchParams?.get('eventEn')
  const eventZh = searchParams?.get('eventZh')
  const dateFormatter = useDateFormatter({ dateStyle: 'full' })
  const timeFormatter = useDateFormatter({ timeStyle: 'short' })
  const formattedTime = time ? `${dateFormatter.format(new Date(time))} at ${timeFormatter.format(new Date(time))}` : ''

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
  })

  const { addEventsToCart } = useCart()

  const processForm = async (formData) => {
    const eventId = eventEn
    setStatus('loading')
    setTimeout(() => {
      addEventsToCart(formData, time, eventId)
      reset()
      setStatus('success')
      setTimeout(() => {
        setStatus('idle')
      }, 1800)
    }, 600)
  }

  const [checkoutButton, setCheckout] = useState(false)
  useEffect(() => {
    if (status === 'success') setCheckout(true)
  }, [status])

  return (
    <div className='mt-4 flex h-full w-full translate-y-16 flex-col items-end overflow-x-hidden text-green-900'>
      <div
        className={
          'event-item-head relative h-[52px] w-full min-w-[350px] translate-x-12 justify-end md:w-[calc(100%-200px)]'
        }
      >
        <p
          ref={horizontalRef}
          style={{ opacity: 0 }}
          className='relative flex h-[52px] w-full border-t border-green-900/60'
        />
      </div>

      <div
        ref={eventBodyRef}
        style={{ opacity: 0 }}
        className='relative 
                  bottom-0 min-h-[600px] 
                  w-full min-w-[350px] translate-x-[-4px] translate-y-[1px] border-l border-green-900/60 p-6 md:w-[calc(100%-200px)]'
      >
        <button className='cursor-pointer hover:text-red-400' onClick={() => router.back()}>
          {' '}
          [ &lt;- back to event ]
        </button>

        <h1 className='text-xl'> 即將為您預約 {eventZh} </h1>
        <h1 className='text-xl'> You are about to book {eventEn}</h1>
        <div className='space-y-2 '>
          <p>
            <strong>{formattedTime}</strong>
          </p>
          <p>請確實填寫正確資訊 Please fill in the form below to confirm.</p>
        </div>

        <div className='mt-8 w-full min-w-[300px] max-w-[400px] pb-[200px] md:w-1/3'>
          <form
            onSubmit={handleSubmit(processForm)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault() // prevent enter triggers submit
            }}
          >
            <div className='grid gap-2'>
              <Input register={register} name='name' id='name' label='Name' required />
              {errors?.name?.message && <span className='text-sm text-red-500'>{errors?.name?.message}</span>}

              <Input register={register} name='email' id='email' label='Email' type='email' required />
              {errors?.email?.message && <span className='text-sm text-red-500'>{errors?.email?.message}</span>}

              <Input register={register} name='phone' id='phone' label='Phone' type='text' required />
              {errors?.phone?.message && <span className='text-sm text-red-500'>{errors?.phone?.message}</span>}
            </div>
            <div className='mt-4 inline-flex gap-4'>
              <Button type='submit' size={'medium'} impact={'bold'} shape={'rounded'} status={status}>
                ADD TO CART
              </Button>
              {checkoutButton && (
                <Button
                  type='button'
                  size={'medium'}
                  impact={'bold'}
                  shape={'rounded'}
                  status={'idle'}
                  onClick={() => routerMiddleware.push('/checkout')}
                >
                  CHECKOUT
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
