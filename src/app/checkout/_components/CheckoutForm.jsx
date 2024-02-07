'use client'

import useCheckoutAnimation from '@/utils/hooks/useCheckoutAnimation'
import { Input } from '@/components/Input'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

const CheckoutForm = ({ introScopeRef }) => {
  useCheckoutAnimation({ introScopeRef })

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext()

  const [data, setData] = useState({
    [`payer.name`]: '',
    [`payer.email`]: '',
    [`payer.phone`]: '',
    [`payer.street`]: '',
    [`payer.city`]: '',
    [`payer.nation`]: '',
  })

  useEffect(() => {
    setValue('payer', {
      name: data[`payer.name`],
      email: data[`payer.email`],
      phone: data[`payer.phone`],
      street: data[`payer.street`],
      city: data[`payer.city`],
      nation: data[`payer.nation`],
    })
  }, [data, setValue])

  const handleChange = (e) => {
    e.preventDefault()
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <form ref={introScopeRef} className='m-6 max-w-[370px] text-green-900'>
      <h1 style={{ opacity: 0 }} className='checkout-title font-bold'>
        {' '}
        Checkout Information
      </h1>
      <div style={{ opacity: 0 }} className='checkout-inputs grid gap-2 '>
        <Input
          register={register}
          onChange={handleChange}
          name='payer.name'
          id='payer.name'
          label='姓名 Name'
          required
          placeholder='name'
        />
        {errors?.payer?.name?.message && <span className='text-sm text-red-500'>{errors?.payer?.name?.message}</span>}

        <Input
          register={register}
          onChange={handleChange}
          name='payer.email'
          id='payer.email'
          label='電子信箱 Email'
          type='email'
          required
          placeholder='your@email.com'
        />
        {errors?.payer?.email?.message && <span className='text-sm text-red-500'>{errors?.payer?.email?.message}</span>}

        <Input
          register={register}
          onChange={handleChange}
          name='payer.phone'
          id='payer.phone'
          label='手機 Phone'
          type='string'
          required
          placeholder='+886888888888'
        />
        {errors?.payer?.phone?.message && <span className='text-sm text-red-500'>{errors?.payer?.phone?.message}</span>}

        <Input
          register={register}
          onChange={handleChange}
          name='payer.street'
          id='payer.street'
          label='地址 Street'
          type='stirng'
          required
          placeholder='郵遞區號 地址'
        />
        {errors?.payer?.street?.message && (
          <span className='text-sm text-red-500'>{errors?.payer?.street?.message}</span>
        )}

        <Input
          register={register}
          onChange={handleChange}
          name='payer.city'
          id='payer.city'
          label='城市 City'
          type='stirng'
          required
          placeholder='台北市'
        />
        {errors?.payer?.city?.message && <span className='text-sm text-red-500'>{errors?.payer?.city?.message}</span>}

        <Input
          register={register}
          onChange={handleChange}
          name='payer.nation'
          id='payer.nation'
          label='國家 Nation'
          type='stirng'
          required
          placeholder='台灣'
        />
        {errors?.payer?.nation?.message && (
          <span className='text-sm text-red-500'>{errors?.payer?.nation?.message}</span>
        )}
      </div>
    </form>
  )
}
export default CheckoutForm
