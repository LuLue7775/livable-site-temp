'use client'

import { Input } from '@/components/Input'
import { useCart } from '@/providers/cartContext'
import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const AttendantForm = ({ attendant, timeId, eventId }) => {
  const { removeEventsFromCart } = useCart()

  const {
    register,
    unregister,
    trigger,
    formState: { errors },
    setValue,
  } = useFormContext()

  const [data, setData] = useState({
    [`attendant.${attendant.uuid}.name`]: attendant.name,
    [`attendant.${attendant.uuid}.email`]: attendant.email,
    [`attendant.${attendant.uuid}.phone`]: attendant.phone,
  })

  // set value on initial
  useEffect(() => {
    setValue(`attendant.${attendant.uuid}`, { name: attendant.name, phone: attendant.phone, email: attendant.email })
  }, [])

  useEffect(() => {
    setValue(`attendant.${attendant.uuid}`, {
      name: data[`attendant.${attendant.uuid}.name`],
      email: data[`attendant.${attendant.uuid}.email`],
      phone: data[`attendant.${attendant.uuid}.phone`],
    })
    // validate on each letter input
    trigger([
      `attendant.${attendant.uuid}.name`,
      `attendant.${attendant.uuid}.email`,
      `attendant.${attendant.uuid}.phone`,
    ])
  }, [data])

  const handleChange = (e) => {
    e.preventDefault()
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <div className='inline-flex w-[300px] gap-2 p-2 font-mono'>
      <div>
        <Input
          register={register}
          name={`attendant.${attendant.uuid}.name`}
          id={`attendant.${attendant.uuid}.name`}
          value={data[`attendant.${attendant.uuid}.name`]}
          label='Name'
          required
          disabled
          onChange={handleChange}
        />
        {errors?.attendant?.[attendant.uuid]?.name?.message && (
          <span className='text-sm text-red-500'>{errors?.attendant?.[attendant.uuid]?.name?.message}</span>
        )}

        <Input
          register={register}
          name={`attendant.${attendant.uuid}.email`}
          id={`attendant.${attendant.uuid}.email`}
          value={data[`attendant.${attendant.uuid}.email`]}
          label='Email'
          required
          disabled
          onChange={handleChange}
        />
        {errors?.attendant?.[attendant.uuid]?.email?.message && (
          <span className='text-sm text-red-500'>{errors?.attendant?.[attendant.uuid]?.email?.message}</span>
        )}

        <Input
          register={register}
          name={`attendant.${attendant.uuid}.phone`}
          id={`attendant.${attendant.uuid}.phone`}
          value={data[`attendant.${attendant.uuid}.phone`]}
          label='Phone'
          required
          disabled
          onChange={handleChange}
        />
        {errors?.attendant?.[attendant.uuid]?.phone?.message && (
          <span className='text-sm text-red-500'>{errors?.attendant?.[attendant.uuid]?.phone?.message}</span>
        )}
        <button
          className='text-sm hover:text-red-500  '
          onClick={() => {
            removeEventsFromCart({ uuid: attendant.uuid, timeId: timeId, eventId: eventId })
            unregister([
              `attendant.${attendant.uuid}.name`,
              `attendant.${attendant.uuid}.email`,
              `attendant.${attendant.uuid}.phone`,
              `attendant.${attendant.uuid}.notes`,
            ])
          }}
        >
          [X delete]
        </button>
      </div>
    </div>
  )
}

export default AttendantForm
