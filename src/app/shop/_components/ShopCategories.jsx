'use client'

const MainCategory = ({ name = '', tag = '', setProductsFilter, setProductsSubFilter }) => {
  return (
    <li>
      <a
        className='cursor-pointer hover:border-b hover:border-red-300 hover:text-red-300'
        onClick={() => {
          setProductsFilter(tag)
          setProductsSubFilter(null)
        }}
      >
        {name}
      </a>
    </li>
  )
}
const SubCategory = ({ name = '', tag = '', setProductsSubFilter, setProductsFilter }) => {
  return (
    <li className='pl-4'>
      <a
        className='cursor-pointer hover:border-b hover:border-red-300 hover:text-red-300'
        onClick={() => {
          setProductsSubFilter(tag)
          setProductsFilter(null)
        }}
      >
        {name}
      </a>
    </li>
  )
}

const ShopCategories = ({ setProductsFilter, setProductsSubFilter }) => {
  //   const [isExpland, setExpand] = useState(false)
  return (
    <aside data-testid='shop-categories' className='font-mono'>
      <ul>
        <MainCategory
          name='FEATURED'
          tag='featured'
          setProductsFilter={setProductsFilter}
          setProductsSubFilter={setProductsSubFilter}
        />
        <MainCategory
          name='CUSTOM TILES'
          tag='custom_tiles'
          setProductsFilter={setProductsFilter}
          setProductsSubFilter={setProductsSubFilter}
        />
        <MainCategory
          name='金屬 METAL'
          tag='metal'
          setProductsFilter={setProductsFilter}
          setProductsSubFilter={setProductsSubFilter}
        />
        <SubCategory
          name='項鍊 necklace'
          tag='necklace'
          setProductsFilter={setProductsFilter}
          setProductsSubFilter={setProductsSubFilter}
        />
        <SubCategory
          name='戒指 rings'
          tag='rings'
          setProductsFilter={setProductsFilter}
          setProductsSubFilter={setProductsSubFilter}
        />
        <SubCategory
          name='耳環 earrings'
          tag='earrings'
          setProductsFilter={setProductsFilter}
          setProductsSubFilter={setProductsSubFilter}
        />

        <MainCategory
          name='玻璃 GLASS'
          tag='glass'
          setProductsFilter={setProductsFilter}
          setProductsSubFilter={setProductsSubFilter}
        />
        <MainCategory
          name='陶 CERAMIC'
          tag='ceramic'
          setProductsFilter={setProductsFilter}
          setProductsSubFilter={setProductsSubFilter}
        />
        <SubCategory
          name='花器 flower vessel'
          tag='flower_vessel'
          setProductsFilter={setProductsFilter}
          setProductsSubFilter={setProductsSubFilter}
        />
        <SubCategory
          name='餐具 tableware'
          tag='tableware'
          setProductsFilter={setProductsFilter}
          setProductsSubFilter={setProductsSubFilter}
        />
        <SubCategory
          name='雕塑 sculpture'
          tag='sculpture'
          setProductsFilter={setProductsFilter}
          setProductsSubFilter={setProductsSubFilter}
        />
        <MainCategory
          name='木 WOOD'
          tag='wood'
          setProductsFilter={setProductsFilter}
          setProductsSubFilter={setProductsSubFilter}
        />
      </ul>
    </aside>
  )
}
export default ShopCategories
