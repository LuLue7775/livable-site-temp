import Button from '@/components/Button'

const QuantityButton = ({ setQuantity, quantity, maxStock }) => {
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  const handleIncrease = () => {
      setQuantity(quantity + 1)
    
  }

  return (
    <div className='my-8 flex items-center' data-testid='quantity-buttons'>
      <h3 className="text-[1.4rem] leading-8"> 數量 Quantity </h3>
      <div className='ml-4 flex items-center gap-4'>
        <Button
          onClick={handleDecrease}
          className={`flex h-11 w-8 items-center justify-center rounded-full border border-green-900/50 ${
            quantity > 0 ? 'hover:bg-red-200' : 'cursor-not-allowed opacity-50'
          }`}
          disabled={quantity <= 0}
        >
          -
        </Button>
        <p data-testid='quantity-display' className="min-w-8 text-center text-[1.2rem] leading-8">
          {quantity}
        </p>
        <Button
          onClick={handleIncrease}
          className={`flex h-11 w-8 items-center justify-center rounded-full border border-green-900/50 `}
        >
          +
        </Button>
      </div>
    </div>
  )
}

export default QuantityButton
