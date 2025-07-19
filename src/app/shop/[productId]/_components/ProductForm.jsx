import Button from '@/components/Button'
import { useCart } from '@/providers/cartContext'
import { useState } from 'react'
import QuantityButton from './QuantityButton'
import OrderedVariationSelect from './OrderedVariationSelect'

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
  const [quantity, setQuantity] = useState(1)
  const [selectedValue, setSelectedValue] = useState(genInitialSelectedVal(product))
  const [error, setError] = useState('')
  const [selectedCombination, setSelectedCombination] = useState(null)

  const handleClick = (e) => {
    e.preventDefault()

    // Validate that all variations are selected
    const allSelected = Object.values(selectedValue).every(value => value !== '')
    if (!allSelected) {
      setError('請選擇所有款式 Please select all variations')
      return
    }

    // Get the combined key for the selected variations using variation_order
    const combinedKey = product.variation_order
      .map(v => selectedValue[v.zh])
      .join('-')
    
    const combination = product.variation_combinations[combinedKey]
    
    if (!combination) {
      setError('無效的款式組合 Invalid combination')
      return
    }

    if (quantity > combination.stock) {
      setError('庫存數量不足 Insufficient stock')
      return
    }

    const data = {
      id: product.id,
      quantity: quantity,
      variation: selectedValue,
      price: combination.price,
      title: { en: product.title.en, zh: product.title.zh },
      image: product.images[0],
    }

    addProductsToCart(data)
    setError('')
  }

  const handleSelectChange = (key, value) => {
    setSelectedValue((prevVal) => {
      const newVal = { ...prevVal, [key]: value }
      
      // Find the index of the changed variation
      const changedIndex = product.variation_order.findIndex(v => v.zh === key)
      
      // Reset all subsequent variations
      product.variation_order.slice(changedIndex + 1).forEach(v => {
        newVal[v.zh] = ''
      })
      
      return newVal
    })
    // Reset error when variation changes
    setError('')
  }

  return (
    <>
      <OrderedVariationSelect
        product={product}
        selectedValue={selectedValue}
        handleSelectChange={handleSelectChange}
        onCombinationChange={setSelectedCombination}
        selectedCombination={selectedCombination}
      />

      <QuantityButton 
        setQuantity={setQuantity} 
        quantity={quantity} 
        maxStock={selectedCombination?.stock}
      />

      {error && (
        <p data-testid='error' className="mt-4 text-[1.2rem] leading-8 text-red-600">
          {error}
        </p>
      )}
      <Button
        data-testid='add-to-cart-button'
        onClick={handleClick}
        className='mt-8 h-16 w-48 rounded-full border border-green-900/50 transition-colors duration-200 hover:bg-red-200'
      >
        <div className="flex flex-col items-center justify-center text-[1.2rem] leading-[1.4rem]">
          <span className="!text-white">加入購物車</span>
          <span className="text-[1rem] !text-white">ADD TO CART</span>
        </div>
      </Button>
    </>
  )
}
export default ProductForm
