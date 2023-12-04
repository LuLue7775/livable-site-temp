import Button from '@/components/Button'
import { useCart } from '@/providers/cartContext'
import { useState } from 'react'
import VariationSelectFields from './VariationSelectFields'
import QuantityButton from './QuantityButton'

const genInitialSelectedVal = (product) => {
  if (!product?.variation) return
  return Object.entries(product.variation)?.reduce((newMap, [key, variation]) => {
    newMap[key] = variation[0]
    return newMap
  }, {})
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

      <VariationSelectFields
        variations={product?.variation}
        selectedValue={selectedValue}
        handleSelectChange={handleSelectChange}
      />

      <div className='my-2 max-w-[700px]'>
        價格 Price : NTD {product?.price} <br />
      </div>

      <QuantityButton setQuatity={setQuatity} quantity={quantity} />

      <Button
        data-testid='add-to-cart-button'
        onClick={handleClick}
        className='h-16 w-40 rounded-md border border-green-900/50 hover:bg-red-200 '
      >
        加入購物車 <br />
        ADD TO CART
      </Button>
    </>
  )
}
export default ProductForm
