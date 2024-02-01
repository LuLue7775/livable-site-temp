import ShopItem from './ShopItem'

const ShopList = ({ products, error }) => {
  if (error) return conole.error('An error has occurred: ' + error.message)
  return (
    <main data-testid='shop-list' className='grid grid-cols-1 gap-8 md:-translate-y-32 md:grid-cols-3'>
      {products?.map((product, i) => (
        <ShopItem key={i} product={product} i={i} />
      ))}
    </main>
  )
}
export default ShopList
