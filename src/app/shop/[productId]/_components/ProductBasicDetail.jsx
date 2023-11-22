import { sanitize } from 'isomorphic-dompurify'

const ProductBasicDetail = ({ product }) => {
  return (
    <>
      <div className='my-2 max-w-[700px]'>
        <h3>關於此作品 About This Piece</h3>
        <div className='pl-4 text-sm' dangerouslySetInnerHTML={{ __html: sanitize(product?.description?.zh) }} />
      </div>
      <div className='my-2 max-w-[700px]'>
        <h3>細部材質 Materials </h3>
        <div className='pl-4 text-sm' dangerouslySetInnerHTML={{ __html: sanitize(product?.material?.zh) }} />
      </div>
      <div className='my-2 max-w-[700px]'>
        <h3>商品尺寸 Dimensions </h3>
        <div className='pl-4 text-sm' dangerouslySetInnerHTML={{ __html: sanitize(product?.dimension?.zh) }} />
      </div>
    </>
  )
}
export default ProductBasicDetail
