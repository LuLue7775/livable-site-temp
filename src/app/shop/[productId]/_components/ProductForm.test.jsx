import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VariationSelectFields from './VariationSelectFields'
import QuantityButton from './QuantityButton'
import Button from '@/components/Button'

describe('AddProduct', () => {
  describe('Render', () => {
    it('should render the select fields if it is present', () => {
      const selectData = {
        VariationOne: ['option1-1', 'option1-2'],
        VariationTwo: ['option2-1', 'option2-2'],
      }
      const selectedValue = {
        VariationOne: 'option1-1',
        VariationTwo: 'option2-1',
      }
      render(<VariationSelectFields variations={selectData} selectedValue={selectedValue} />)

      const variationKeys = Object.entries(selectData)
      expect(variationKeys.length).toBeGreaterThan(0)

      variationKeys.forEach(([optionKey, options]) => {
        const selectField = screen.getByTestId(`select-field-${optionKey}`)
        expect(selectField).toBeInTheDocument()
        options.forEach((option) => {
          const optionElement = screen.getByText(option)
          expect(optionElement).toBeInTheDocument()
        })
      })
    })

    it('should render the quantity buttons', async () => {
      render(<QuantityButton />)
      const buttons = screen.getByTestId('quantity-buttons')
      expect(buttons).toBeInTheDocument()
    })

    // it('should render the cart button', async () => {
    //   render(<Button />)
    //   const button = screen.getByTestId('add-to-cart-button')
    //   expect(button).toBeInTheDocument()
    // })
  })

  describe('Behavior', () => {
    it('should handle the selection change', () => {
      const selectData = {
        VariationOne: ['option1-1', 'option1-2'],
        VariationTwo: ['option2-1', 'option2-2'],
      }
      const initialSelectedValues = {
        VariationOne: 'option1-1',
        VariationTwo: 'option2-1',
      }
      const mockHandleSelectChange = jest.fn()
      render(
        <VariationSelectFields
          variations={selectData}
          selectedValue={initialSelectedValues}
          handleSelectChange={mockHandleSelectChange}
        />,
      )
      const variationOneSelected = screen.getByTestId('select-field-VariationOne')
      fireEvent.change(variationOneSelected, { target: { value: 'option1-2' } })
      expect(mockHandleSelectChange).toHaveBeenCalledWith('VariationOne', 'option1-2')
    })
    // it('should be able to add or deduct products', async () => {})
    // it('should be able to add product to cart', async () => {})
  })
})
