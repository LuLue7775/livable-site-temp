'use client'

import Button, { Cross } from '@/components/Button'
import { Input } from '@/components/Input'
import { useCart } from '@/context/cartContext'
import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const AttendantForm = ({ attendant, timeId, eventId }) => {
  const { removeEventsFromCart, editForm } = useCart()

  const {
    register,
    unregister,
    trigger,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext()

  const [canEdit, setEdit] = useState(false)
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

  /** @bug performance bug. this runs on first render. */
  useEffect(() => {
    // revalidate on save
    if (!canEdit) return
    trigger()

    if (Object.keys(errors).length) return

    const newData = getValues([
      `attendant.${attendant.uuid}.name`,
      `attendant.${attendant.uuid}.email`,
      `attendant.${attendant.uuid}.phone`,
    ])
    editForm({ newData, uuid: attendant.uuid, timeId, eventId })
  }, [canEdit])

  const handleChange = (e) => {
    e.preventDefault()
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <div className='w-84 inline-flex gap-2 p-2 '>
      <button
        className='hover:text-red-500'
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
        <Cross />
      </button>
      <div>
        <Input
          register={register}
          name={`attendant.${attendant.uuid}.name`}
          id={`attendant.${attendant.uuid}.name`}
          value={data[`attendant.${attendant.uuid}.name`]}
          label='Name'
          required
          disabled={!canEdit}
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
          disabled={!canEdit}
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
          disabled={!canEdit}
          onChange={handleChange}
        />
        {errors?.attendant?.[attendant.uuid]?.phone?.message && (
          <span className='text-sm text-red-500'>{errors?.attendant?.[attendant.uuid]?.phone?.message}</span>
        )}
      </div>

      <Button className='w-20' disabled={Object.keys(errors).length} onClick={() => setEdit(!canEdit)}>
        {canEdit ? 'Save' : 'Edit'}
      </Button>
    </div>
  )
}

export default AttendantForm
