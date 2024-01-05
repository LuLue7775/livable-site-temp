import ProductBasicDetail from './ProductBasicDetail'
import ProductForm from './ProductForm'
import ProductDetail from './ProductDetail'
import Image from 'next/image'

/**　@todo caraousel */
const ProductContent = ({ product }) => {
  return (
    <main className='absolute top-4 grid w-screen grid-cols-1 gap-4 p-8 md:left-[-200px] md:grid-cols-3'>
      <div className='col-span-1'>
        <Image
          alt={`image-${product?.title?.en}`}
          src={product?.images?.[0]}
          width={1200}
          height={1200}
          sizes='100vw'
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className='col-span-1 md:col-span-2'>
        <div className='flex'>
          <h1> {product?.title?.zh} </h1>{' '}
          <p className='ml-4 border-l border-green-900/50 pl-4 text-2xl'> {product?.title?.en} </p>{' '}
        </div>

        <div className='font-mono'>
          <ProductBasicDetail product={product} />

          <ProductForm product={product} />

          <ProductDetail product={product} />
        </div>
      </div>
    </main>
  )
}

export default ProductContent
