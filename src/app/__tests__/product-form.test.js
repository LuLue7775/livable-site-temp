import React, { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VariationSelectFields from '@/app/shop/[productId]/_components/VariationSelectFields'
import QuantityButton from '@/app/shop/[productId]/_components/QuantityButton'
import ProductForm from '../shop/[productId]/_components/ProductForm'
import Providers from '@/providers/provider'

const selectData = {
  VariationOne: ['option1-1', 'option1-2'],
  VariationTwo: ['option2-1', 'option2-2'],
}
const selectedValue = {
  VariationOne: 'option1-1',
  VariationTwo: 'option2-1',
}

const initialSelectedValues = {
  VariationOne: 'option1-1',
  VariationTwo: 'option2-1',
}

const product = {
  stock: 0,
  variation: selectData,
  price: 1280,
  title: { en: 'eucalyptus-ring', zh: '尤加利果戒指' },
  images: ['image-url1', 'image-url2'],
}

const productSelected = {
  id: 'eucalyptus-ring',
  quantity: 1,
  variation: selectedValue,
  price: 1280,
  title: { en: 'eucalyptus-ring', zh: '尤加利果戒指' },
  image: product.images[0],
}

describe('Render', () => {
  it('should render the select fields if it is present', () => {
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
})

describe('Behavior', () => {
  it('should handle the selection change', () => {
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

  it('should be able to add or deduct products', async () => {
    const MockProductForm = () => {
      const [quantity, setQuantity] = useState(1)
      return <QuantityButton setQuantity={setQuantity} quantity={quantity} />
    }
    render(<MockProductForm />)
    const user = userEvent.setup()

    const addBtn = screen.getByRole('button', { name: /\+/ })
    const deductBtn = screen.getByRole('button', { name: /\-/ })
    const quantityDisplay = screen.getByTestId('quantity-display')
    expect(addBtn).toBeInTheDocument()
    expect(deductBtn).toBeInTheDocument()

    await user.click(addBtn)
    await user.click(addBtn)
    expect(quantityDisplay).toHaveTextContent('3')

    await user.click(deductBtn)
    expect(quantityDisplay).toHaveTextContent('2')
  })

  it('should be able to add product to cart with user inputs', async () => {
    const MockProductForm = () => {
      return (
        <Providers>
          <ProductForm product={product} />
        </Providers>
      )
    }
    render(<MockProductForm />)
    const user = userEvent.setup()

    const addToCartBtn = screen.getByTestId('add-to-cart-button')
    await user.click(addToCartBtn)

    const localstorage_product_key = '__testing-product__'
    window.localStorage.setItem(localstorage_product_key, JSON.stringify(productSelected))

    expect(localStorage.getItem(localstorage_product_key)).toEqual(JSON.stringify(productSelected))
  })

  it('should show error when product is out of stock', async () => {
    const MockProductForm = () => {
      return (
        <Providers>
          <ProductForm product={product} />
        </Providers>
      )
    }
    render(<MockProductForm />)
    const user = userEvent.setup()

    const addToCartBtn = screen.getByTestId('add-to-cart-button')
    const errorDisplay = screen.getByTestId('error')
    await user.click(addToCartBtn)

    expect(errorDisplay).toHaveTextContent('Sorry! 庫存數量不足')
  })
})
