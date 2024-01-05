import { sanitize } from 'isomorphic-dompurify'

const ProductDetail = ({ product }) => {
  return (
    <section className='my-4 border-y border-green-900'>
      {product?.care?.zh && (
        <div className='my-2 max-w-[700px]'>
          <h3>基本保養 Care & maintenance </h3>
          <div className='pl-4 text-sm' dangerouslySetInnerHTML={{ __html: sanitize(product?.care?.zh) }} />
        </div>
      )}
      {product?.packaging?.zh && (
        <div className='my-2 max-w-[700px]'>
          <h3>關於包裝 Packaging </h3>
          <div className='pl-4 text-sm' dangerouslySetInnerHTML={{ __html: sanitize(product?.packaging?.zh) }} />
        </div>
      )}
      {product?.reminder?.zh && (
        <div className='my-2 max-w-[700px]'>
          <h3>提醒事項 reminder </h3>
          <div className='pl-4 text-sm' dangerouslySetInnerHTML={{ __html: sanitize(product?.reminder?.zh) }} />
        </div>
      )}
      {product?.shipping_details?.zh && (
        <div className='my-2 max-w-[700px]'>
          <h3>配送相關事項 Shipping Details </h3>
          <div className='pl-4 text-sm' dangerouslySetInnerHTML={{ __html: sanitize(product?.shipping_details?.zh) }} />
        </div>
      )}
      {product?.warranty?.zh && (
        <div className='my-2 max-w-[700px]'>
          <h3>保固期限 Warranty </h3>
          <div className='pl-4 text-sm' dangerouslySetInnerHTML={{ __html: sanitize(product?.warranty?.zh) }} />
        </div>
      )}
    </section>
  )
}
export default ProductDetail
