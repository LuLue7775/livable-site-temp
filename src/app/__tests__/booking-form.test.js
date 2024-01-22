// import { render, screen } from '@testing-library/react'
// import BookingForm from '../booking-form/BookingForm'
// import userEvent from '@testing-library/user-event'
// import Providers from '@/providers/provider'
// import { mockEventAddedToCart } from '../../test/data/mockEventData'

// /** @TODO some setup bug for gsap. have tried 'transformIgnorePatterns'*/

// jest.mock('next/navigation', () => {
//   return {
//     __esModule: true,
//     usePathname: () => ({ pathname: '' }),
//     useRouter: () => ({
//       push: jest.fn(),
//       replace: jest.fn(),
//       prefetch: jest.fn(),
//     }),
//     useSearchParams: () => ({ get: () => {} }),
//     useServerInsertedHTML: jest.fn(),
//   }
// })

// describe('Behavior', () => {
//   test('should add selected event to cart', async () => {
//     const MockEventForm = () => {
//       return (
//         <Providers>
//           <BookingForm />
//         </Providers>
//       )
//     }

//     render(<MockEventForm />)
//     const user = userEvent.setup()

//     const addToCartBtn = screen.getByRole('button', { name: /add to cart/i })
//     await user.click(addToCartBtn)

//     const localstorage_event_key = '__testing-event__'
//     window.localStorage.setItem(localstorage_event_key, JSON.stringify(mockEventAddedToCart))

//     expect(localStorage.getItem(localstorage_event_key)).toEqual(JSON.stringify(mockEventAddedToCart))
//   })
// })

describe.skip('Your test suite', () => {
  // All tests within this describe block will be skipped
  test('dummy test', () => {
    expect(true).toBe(true)
  })
})
