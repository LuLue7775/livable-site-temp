'use client'

import useDelayRouting from '@/utils/hooks/useDelayRouting'
import { addDocToFirestore, getMapDocsFromFirestore } from '@/utils/firebase/firebase.utils'
import Button from '@/components/Button'
import { useCart } from '@/providers/cartContext'
// import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import ShortUniqueId from 'short-unique-id'

async function createCheckOutSessionAPI(paymentData) {
  try {
    await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })
  } catch (error) {
    console.error('Handle create order session error', error?.message)
  }
}

const CheckoutTotal = () => {
  const routerMiddleware = useDelayRouting()

  const { cartTotal, eventItems, productItems } = useCart()

  const { data: bookingAvailabilities } = useQuery({
    queryKey: ['event-availabilities'],
    queryFn: async () => await getMapDocsFromFirestore('event-availabilities'),
    refetchOnWindowFocus: true,
  })

  const { mutate } = useMutation({
    mutationFn: addDocToFirestore,
    // onSuccess: async (data) => {
    //   console.log(data)
    // },
  })

  const {
    // formState: { errors },
    handleSubmit,
  } = useFormContext()

  /** @TODO error message popup modal */
  const [errorHandler, setErrorHandler] = useState('')
  const onSubmit = async (formData) => {
    // check out of stock or available in DB
    const availability = checkAvailability({ setErrorHandler, eventItems, bookingAvailabilities })
    if (availability === false) return

    // create valid data for ecpay
    // console.log('formData = ', formData)
    const orderData = transformToDBOrderData({
      ...formData,
      eventItems,
      productItems,
      total: cartTotal,
      items: ECPAY_ALLITEMS({ eventItems, productItems }).join('#'),
    })

    const ecpayFormData = transformDataToEcpayFormat(orderData)

    // hit api to createFirebaseOrder
    mutate({ collection: 'orders', docId: orderData.orderId, objectToAdd: orderData })
    // createCheckOutSession for /payment
    await createCheckOutSessionAPI(ecpayFormData) // this goes to cookie
    // direct to /payment to generate ecpay page
    routerMiddleware.push('/payment')
    // clear localstorage
    // setEvent({})

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

// function cleanedEvents(events) {
//   Object.values(events).reduce( (acc, event ) => {
//     if (Object.keys(event).length) {
//       acc[event]
//     }
//     return acc
//   }, {})
// }

function transformToDBOrderData(data) {
  const tradeID = new ShortUniqueId({ length: 20 })
  // const timestamp = new Date().toISOString() // 2023-09-19T06:40:58.227Z
  const timestamp = new Date().toLocaleString('zh-TW', {
    timeZone: 'Asia/Taipei',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  const genOrderId = tradeID.formattedUUID(`${timestamp.replace(/\D/g, '').replace(/\d{2}:\d{2}$/, '')}HH$r2`)

  const orderData = {
    currency: 'NTD',
    paymentMethod: 'ecpay',
    status: 'pending',
    orderId: genOrderId,
    total: data.total.eventTotal + data.total.productTotal,
    eventTotal: data.total.eventTotal ?? '0',
    productTotal: data?.productTotal ?? '0',
    items: data.items,
    // products: data.products,
    // events: cleanedEvents(data.eventItems),
    events: data.eventItems,
    payer: { name: data.payer.name, phone: data.payer.phone, email: data.payer.email },
    address: {
      street: data.payer.street || '',
      city: data.payer.city || '',
      nation: data.payer.nation || '',
    },

    createdAt: covertTimestamp(timestamp),
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

function ECPAY_ALLITEMS({ eventItems, productItems }) {
  const events = []
  Object.entries(eventItems).forEach(([eventId, timeSlot]) => {
    // sometimes event cart has empty object
    if (!Object.keys(timeSlot).length) return
    return Object.entries(timeSlot).forEach(([time, attendants]) => {
      events.push(`${eventId} at ${time} x${attendants.length}`)
    })
  })

  const products = Object.values(productItems).reduce((totalItems, product) => {
    totalItems.push(`${product.title.zh} x${product.quantity}`)
    return totalItems
  }, [])
  return [...events, ...products]
}

function covertTimestamp(timestamp) {
  // Split the input string into date and time parts
  const [datePart, timePart] = timestamp.split(' ')

  // Split the date part into year, month, and day
  const [year, month, day] = datePart.split('/')

  // Pad the month and day with leading zeros
  const paddedMonth = month.padStart(2, '0')
  const paddedDay = day.padStart(2, '0')

  // Create a new formatted string
  const formattedString = `${year}/${paddedMonth}/${paddedDay} ${timePart}`

  return formattedString
}
