'use client'

import { createContext, useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useLocalStorage from '@/utils/hooks/useLocalStorage'
import { getMapDocsFromFirestore } from '@/utils/firebase/firebase.utils'
import ShortUniqueId from 'short-unique-id'
const genUuid = new ShortUniqueId({ length: 10 })

export const CartContext = createContext({
  productItems: [],
  eventItems: {},
  eventItems: () => {},
  calculateTotalQuantity: 0,
  cartTotal: {},
  calculateEventTotal: () => {},
  addEventsToCart: () => {},
  removeEventsFromCart: () => {},
  clearCart: () => {},
  editForm: () => {},
  setCartOpened: () => {},
  isCartOpened: false,
})

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) throw new Error('useCart must be used within a CartProvider')
  return context
}

export function CartProvider({ children }) {
  const [isCartOpened, setCartOpened] = useState(false)

  const [productItems, setProduct] = useLocalStorage('product-items', [])
  const [eventItems, setEvent] = useLocalStorage('event-items', {})

  // Get data from localstorage that is persisted ealier

  const { data: bookingAvailabilities } = useQuery({
    queryKey: ['event-availabilities'],
    queryFn: async () => await getMapDocsFromFirestore('event-availabilities'),
    refetchOnWindowFocus: false,
  })

  // console.log(bookingAvailabilities)
  // const flattenData = useMemo(() => {
  //   if (ALL_EVENTS?.pages?.length <= 1) return ALL_EVENTS?.pages[0]?.data
  //   return ALL_EVENTS?.pages?.flatMap((page) => page.data)
  // }, [ALL_EVENTS])

  /**
   * return Example 
   * {
    "2023-09-26T05:00": [
        {
            "name": "11",
            "email": "11@gmail.com",
            "phone": "24125523646",
            "notes": ""
        },
        {
            "name": "2222",
            "email": "222@gmail.com",
            "phone": "24125523646",
            "notes": ""
        },
        {
            "name": "33",
            "email": "333@gmail.com",
            "phone": "24125523646",
            "notes": ""
        }
    ]
}
   */

  /**
   * productData: { variation:{}, quantity:1, price:1000, productName: {en:'', zh:''} }
   */
  function addProductsToCart(productData) {
    setProduct((currItems) => {
      let returnData = {}
      const variationVal = JSON.stringify([...Object.values(productData.variation)])
      const productId = `${productData.id}-${variationVal}`

      // if this product hasn't exist in cart yet
      if (!(productId in currItems)) {
        returnData = {
          ...currItems,
          [productId]: productData,
        }
      } else {
        let thisProductExsistedValue = currItems[productId]

        // need to check variation too.
        if (JSON.stringify(thisProductExsistedValue.variation) !== JSON.stringify(productData.variation)) {
          returnData = {
            ...currItems,
            [productId]: {
              ...thisProductExsistedValue,
              variation: productData.variation,
              quantity: productData.quantity,
            },
          }
        } else {
          returnData = {
            ...currItems,
            [productId]: {
              ...thisProductExsistedValue,
              quantity: thisProductExsistedValue.quantity + productData.quantity,
            },
          }
        }
      }

      return returnData
    })

    setCartOpened(true)

    setTimeout(() => {
      setCartOpened(false)
    }, 2500)
  }

  function removeProductsFromCart({ productId }) {
    setProduct((currItems) => {
      return Object.fromEntries(Object.entries(currItems).filter(([key, val]) => productId !== key))
    })
  }

  function addEventsToCart(formData, time, eventId) {
    const bookId = genUuid.rnd()
    setEvent((currItems) => {
      let returnData = {}
      // if this event hasn't exist in cart yet
      if (!(eventId in currItems)) {
        returnData = {
          ...currItems,
          [eventId]: { [time]: [{ ...formData, uuid: bookId, time: time }] },
        }
      } else {
        let thisEventExsistedValue = eventItems[eventId]

        // if this timeslot hasn't been booked yet (time is the uuid)
        if (!(time in thisEventExsistedValue)) {
          returnData = {
            ...currItems,
            [eventId]: { ...thisEventExsistedValue, [time]: [{ ...formData, uuid: bookId, time: time }] },
          }
        } else {
          let thisTimeSlotValue = eventItems[eventId][time]
          returnData = {
            ...currItems,
            [eventId]: {
              ...thisEventExsistedValue,
              [time]: [thisTimeSlotValue, { ...formData, uuid: bookId, time: time }].flat(),
            },
          }
        }
      }

      return returnData
    })

    setCartOpened(true)

    setTimeout(() => {
      setCartOpened(false)
    }, 2500)
  }

  function removeEventsFromCart({ uuid, timeId, eventId }) {
    setEvent((currItems) => {
      // leave other objects untouched.
      const untouchedEvents = Object.keys(currItems)
        .filter((currDate) => !currDate.includes(eventId))
        .reduce((obj, key) => {
          obj[key] = currItems[key]
          return obj
        }, {})

      // if this event not exist anymore
      if (!currItems[eventId]) return currItems

      // deal with filtering
      const filterItems = Object.values(currItems[eventId])
        .flat()
        .filter((item) => item.uuid !== uuid)

      const updatedAttendantsMap = filterItems.reduce((acc, attendant) => {
        if (!(attendant.time in acc)) acc[attendant.time] = [attendant]
        else acc[attendant.time].push(attendant)
        return acc
      }, {})

      let mergeObject = {
        ...untouchedEvents,
        [eventId]: { ...updatedAttendantsMap },
      }

      return mergeObject
    })
  }

  function editForm({ newData, uuid, timeId, eventId }) {
    // temperary. react hook form hasn't getValues yet
    if (!newData[0]) return

    setEvent((currItems) => {
      const untouchedEvents = Object.keys(currItems)
        .filter((currDate) => !currDate.includes(eventId))
        .reduce((obj, key) => {
          obj[key] = currItems[key]
          return obj
        }, {})

      const filterItems = Object.values(currItems[eventId])
        .flat()
        .map((item) => {
          if (item.uuid === uuid) {
            return {
              name: newData[0],
              email: newData[1],
              phone: newData[2],
              uuid: uuid,
              notes: newData[3],
              time: timeId,
            }
          } else return item
        })

      const updatedAttendantsMap = filterItems.reduce((acc, attendant) => {
        if (!(attendant.time in acc)) acc[attendant.time] = [attendant]
        else acc[attendant.time].push(attendant)
        return acc
      }, {})

      let mergeObject = {
        ...untouchedEvents,
        [eventId]: { ...updatedAttendantsMap },
      }

      return mergeObject
    })
  }

  const cartTotal = {
    eventTotal: Object.entries(eventItems).reduce((totalAcc, [eventid, timeBucket]) => {
      // if this event is {}
      if (!Object.keys(timeBucket).length) return totalAcc
      else {
        const eventAcc = Object.entries(timeBucket).reduce((eventAcc, [timeSlot, attendant]) => {
          const thisEventPrice = bookingAvailabilities?.[eventid]?.[timeSlot]?.price * attendant.length || 0
          eventAcc += thisEventPrice
          return eventAcc
        }, 0)
        totalAcc += eventAcc
        return totalAcc
      }
    }, 0),
    productTotal: Object.values(productItems).reduce((totalAcc, item) => {
      totalAcc += item.price * item.quantity
      return totalAcc
    }, 0),
  }

  function clearCart() {}

  const eventQuantity = () => {
    if (!Object.keys(eventItems).length) return 0
    return Object.values(eventItems).reduce((acc, timeSlots) => {
      Object.values(timeSlots).forEach((attendants) => {
        acc += attendants.length
      })
      return acc
    }, 0)
  }
  const productQuantity = () => {
    if (!productItems) return 0
    if (!Object.keys(productItems).length) return 0
    return Object.values(productItems).reduce((acc, items) => {
      acc += items.quantity
      return acc
    }, 0)
  }

  const calculateTotalQuantity = eventQuantity() + productQuantity()

  return (
    <CartContext.Provider
      value={{
        productItems,
        eventItems,
        setEvent,
        addEventsToCart,
        removeEventsFromCart,
        addProductsToCart,
        removeProductsFromCart,
        editForm,
        cartTotal,
        clearCart,
        calculateTotalQuantity,
        // calculateEventTotal,
        isCartOpened,
        setCartOpened,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
