import Button from '@/components/Button'
import { useCart } from '@/providers/cartContext'
import { useState } from 'react'

const genInitialSelectedVal = (product) => {
  return product.variation
    ? Object.entries(product.variation)?.reduce((newMap, [key, variation]) => {
        newMap[key] = variation[0]
        return newMap
      }, {})
    : {}
}

const ProductForm = ({ product }) => {
  const { addProductsToCart } = useCart()
  const [quantity, setQuatity] = useState(1)
  const [selectedValue, setSelectedValue] = useState(genInitialSelectedVal(product))
  const handleClick = (e) => {
    e.preventDefault()

    const data = {
      id: product.id,
      quantity: quantity,
      variation: selectedValue,
      price: product.price,
      title: { en: product.title.en, zh: product.title.zh },
      image: product.images[0],
    }

    addProductsToCart(data)
  }

  const handleSelectChange = (key, value) => {
    setSelectedValue((prevVal) => {
      return { ...prevVal, [key]: value }
    })
  }

  return (
    <>
      <div className='my-2 max-w-[700px]'>
        庫存 Stock :
        {product?.stock ? product?.stock : <span className='text-sm'>此商品為訂製品，製作時間最長約2周 </span>}
      </div>

      {product?.variation && (
        <>
          <h3>款式 Variations </h3>
          {Object.entries(product?.variation)?.map(([optionKey, options]) => {
            return (
              <div key={optionKey} className='w-[400px] border-b border-green-900/50 p-2'>
                <label htmlFor={optionKey}> {optionKey} </label>
                <select
                  value={selectedValue[optionKey]}
                  selected
                  onChange={(e) => handleSelectChange(optionKey, e.target.value)}
                  name={optionKey}
                  id={optionKey}
                  className='ml-4 border border-green-900/50 p-2'
                >
                  {options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            )
          })}
        </>
      )}

      <div className='my-2 max-w-[700px]'>
        價格 Price : NTD {product?.price} <br />
      </div>

      <div className='my-2 flex'>
        <h3> 數量 Quantity </h3>
        <span className='ml-2 inline-flex gap-4'>
          <Button
            onClick={() => setQuatity((prev) => prev > 0 && prev - 1)}
            className='flex h-8 w-8 items-center justify-center rounded-full border border-green-900/50 hover:bg-red-200'
          >
            {' '}
            -{' '}
          </Button>
          <p>{quantity}</p>
          <Button
            onClick={() => setQuatity((prev) => prev + 1)}
            className='flex h-8 w-8 items-center justify-center rounded-full border border-green-900/50 hover:bg-red-200'
          >
            {' '}
            +{' '}
          </Button>
        </span>
      </div>

      <Button onClick={handleClick} className='h-16 w-40 rounded-md border border-green-900/50 hover:bg-red-200 '>
        加入購物車 <br />
        ADD TO CART
      </Button>
    </>
  )
}
export default ProductForm
