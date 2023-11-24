import Button from '@/components/Button'

const QuantityButton = ({ setQuatity, quantity }) => {
  return (
    <div className='my-2 flex' data-testid='quantity-buttons'>
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
  )
}

export default QuantityButton
