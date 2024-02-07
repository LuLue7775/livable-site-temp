'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/Input'
import Button from '@/components/Button'
import { useCart } from '@/providers/cartContext'
import useDelayRouting from '@/utils/hooks/useDelayRouting'
import useCommonMainAnimation from '@/utils/hooks/useCommonMainAnimation'
import { bookingSchema } from '@/utils/schemas'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

export default function BookingForm({ mainScopeRef, eventEn, time }) {
  const routerMiddleware = useDelayRouting()
  useCommonMainAnimation({ mainScopeRef })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
  })

  const { addEventsToCart } = useCart()

  const [status, setStatus] = useState('idle')
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
    <form
      data-testid='booking-form'
      className='mt-8 w-full min-w-[300px] max-w-[400px] pb-[200px] md:w-1/3'
      onSubmit={handleSubmit(processForm)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault() // prevent enter triggers submit
      }}
    >
      <div className='grid gap-2'>
        <Input data-testid='booking-date' register={register} name='name' id='name' label='Name' required />
        {errors?.name?.message && <span className='text-sm text-red-500'>{errors?.name?.message}</span>}

        <Input
          data-testid='booking-date'
          register={register}
          name='email'
          id='email'
          label='Email'
          type='email'
          required
        />
        {errors?.email?.message && <span className='text-sm text-red-500'>{errors?.email?.message}</span>}

        <Input
          data-testid='booking-date'
          register={register}
          name='phone'
          id='phone'
          label='Phone'
          type='text'
          required
        />
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
  )
}
