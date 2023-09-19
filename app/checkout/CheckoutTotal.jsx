'use client'
import { addDocToFirestore, getMapDocsFromFirestore } from '@/utils/firebase/firebase.utils'
import Button from '@/components/Button'
import { useCart } from '@/context/cartContext'
// import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import ShortUniqueId from 'short-unique-id'
import { getCurrentTaipeiTimeString } from 'node-ecpay-aio'

const CheckoutTotal = () => {
  const { cartTotal, eventItems } = useCart()

  const { data: bookingAvailabilities } = useQuery({
    queryKey: ['event-availabilities'],
    queryFn: async () => await getMapDocsFromFirestore('event-availabilities'),
    refetchOnWindowFocus: true,
  })

  const { mutate, status, reset } = useMutation({
    mutationFn: addDocToFirestore,
    // mutationFn: async() => await addDocToFirestore('order', 'order01', { event: {}, payer: {}}  ),
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.error(error)
    },
    onSettled: () => {
      console.log('settled')
    },
  })

  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext()

  /** @TODO error message popup modal */
  const [errorHandler, setErrorHandler] = useState('')
  const onSubmit = async (formData) => {
    // check out of stock or available in DB

    const availability = checkAvailability({ setErrorHandler, eventItems, bookingAvailabilities })
    if (availability === false) return

    // create valid data for ecpay
    console.log('formData = ', formData)
    const orderData = transformToDBOrderData({
      ...formData,
      eventItems,
      total: cartTotal,
      items: ECPAY_ALLITEMS({ eventItems }).join('#'),
    })
    console.log(orderData)

    // hit api to createFirebaseOrder and createCheckOutSession
    // mutate({ collection: 'order', docId: 'order02', objectToAdd: data })

    // 以下這些在 mutaion onSuccess
    // clear localstorage
    // direct to /payment to generate ecpay page

    /**@TODO MAKE LOCALSTOAGE EXPIRE */
  }

  const handleExternalSubmit = () => {
    handleSubmit(onSubmit)()
  }

  // if total has changed, means cart is updated. we clear the error to revalidate over again.
  useEffect(() => {
    setErrorHandler('')
  }, [cartTotal])

  return (
    <div className='text-right'>
      <p className='w-full border-t' />
      <p>{cartTotal.productTotal ? `商品 product total: ${cartTotal.productTotal}` : ''}</p>
      <p>活動報名 event fee: {cartTotal.eventTotal}</p>
      <p>總計 Total: {cartTotal.eventTotal + cartTotal.productTotal}</p>
      <Button onClick={handleExternalSubmit}> CHECKOUT </Button>
    </div>
  )
}
export default CheckoutTotal

function checkAvailability({ setErrorHandler, eventItems, bookingAvailabilities }) {
  Object.entries(eventItems).forEach(([eventId, timeSlot]) => {
    // sometimes event cart has empty object
    if (!Object.keys(timeSlot).length) return

    Object.entries(timeSlot).forEach(([time, attendants]) => {
      if (!bookingAvailabilities[eventId]) {
        setErrorHandler(`${eventId} 已下架 no longer available`)
        return false
      } else if (!bookingAvailabilities[eventId]?.[time]) {
        setErrorHandler(`${eventId} at ${time} 已下架 no longer available`)
        return false
      } else if (bookingAvailabilities[eventId][time].stock < attendants.length) {
        setErrorHandler(`${eventId} at ${time} 名額不足 not enough seats `)
        return false
      } else if (bookingAvailabilities[eventId][time].stock === 0) {
        setErrorHandler(`${eventId} at ${time} 已額滿 is full `)
        return false
      }
    })
  })
}

function transformToDBOrderData(data) {
  console.log(data)
  const tradeID = new ShortUniqueId({ length: 20 })
  const timestamp = new Date().toISOString()
  const result = tradeID.formattedUUID(`${timestamp}-$r4`) // timestamp is optional

  const orderData = {
    currency: 'NTD',
    paymentMethod: 'ecpay',
    orderId: result,
    total: data.total,
    eventTotal: data?.eventTotal ?? '0',
    productTotal: data?.productTotal ?? '0',
    items: data.items,
    // products: data.products,
    events: data.eventItems,
    payer: { name: data.payer.name, phone: data.payer.phone, email: data.payer.email },
    address: {
      address: data.payer.address || '',
      city: data.payer.city || '',
      country: data.payer.country || '',
    },

    createdAt: getCurrentTaipeiTimeString(),
  }

  return orderData
}

function transformDataToEcpayFormat(data) {
  const dataForm = {
    orderId: data.orderId,
    total: data.total,
    currency: data.currency,
    createdAt: data.createdAt,
    line_items: data.items,
  }
  return dataForm
}

function ECPAY_ALLITEMS({ eventItems }) {
  const events = []
  Object.entries(eventItems).forEach(([eventId, timeSlot]) => {
    // sometimes event cart has empty object
    if (!Object.keys(timeSlot).length) return
    return Object.entries(timeSlot).forEach(([time, attendants]) => {
      events.push(`${eventId} at ${time} x${attendants.length}`)
    })
  })
  return [...events]
}
