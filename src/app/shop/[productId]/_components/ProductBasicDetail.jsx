import { sanitize } from 'isomorphic-dompurify'

const ProductBasicDetail = ({ product }) => {
  return (
    <>
      <div className='my-2 max-w-[700px]'>
        <div className='pl-4 ' dangerouslySetInnerHTML={{ __html: sanitize(product?.description?.zh) }} />
        <div className='pl-4 ' dangerouslySetInnerHTML={{ __html: sanitize(product?.description?.en) }} />
      </div>
      <div className='my-2 max-w-[700px]'>
        <h3>細部材質 Materials </h3>
        <div className='pl-4 ' dangerouslySetInnerHTML={{ __html: sanitize(product?.materials?.zh) }} />
        <div className='pl-4 ' dangerouslySetInnerHTML={{ __html: sanitize(product?.materials?.en) }} />
      </div>
    </>
  )
}
export default ProductBasicDetail
