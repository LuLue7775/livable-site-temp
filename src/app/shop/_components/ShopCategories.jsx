'use client'

import { useRef } from 'react'

const MainCategory = (props) => {
  const { name = '', tag = '', productsFilter, setProductsFilter, setProductsSubFilter } = props
  const isSelected = productsFilter === tag
  const prevTag = useRef(null)

  const handleClick = () => {
    setProductsFilter(tag)
    setProductsSubFilter(null)

    if (!prevTag.current) prevTag.current = tag
    else if (prevTag.current === tag) {
      prevTag.current = null
      setProductsFilter(null)
    }
  }
  return (
    <li>
      <a
        className={`cursor-pointer hover:border-b hover:border-red-300 hover:text-red-300 ${
          isSelected && 'text-red-300'
        } `}
        onClick={handleClick}
      >
        {isSelected ? `- ${name} -` : name}
      </a>
    </li>
  )
}
const SubCategory = (props) => {
  const { name = '', tag = '', setProductsFilter, productsSubFilter, setProductsSubFilter } = props
  const isSelected = productsSubFilter === tag
  const prevTag = useRef()

  const handleClick = () => {
    setProductsFilter(null)
    setProductsSubFilter(tag)

    if (!prevTag.current) prevTag.current = tag
    else if (prevTag.current === tag) {
      prevTag.current = null
      setProductsSubFilter(null)
    }
  }

  return (
    <li className='pl-4'>
      <a
        className={`cursor-pointer hover:border-b hover:border-red-300 hover:text-red-300 ${
          isSelected && 'text-red-300'
        } `}
        onClick={handleClick}
      >
        {isSelected ? `- ${name} -` : name}
      </a>
    </li>
  )
}

const ShopCategories = (props) => {
  return (
    <aside data-testid='shop-categories' className='font-mono'>
      <ul>
        <MainCategory name='FEATURED' tag='featured' {...props} />
        <MainCategory name='CUSTOM TILES' tag='custom_tiles' {...props} />
        <MainCategory name='金屬 METAL' tag='metal' {...props} />
        <SubCategory name='項鍊 necklace' tag='necklace' {...props} />
        <SubCategory name='戒指 rings' tag='rings' {...props} />
        <SubCategory name='耳環 earrings' tag='earrings' {...props} />

        <MainCategory name='玻璃 GLASS' tag='glass' {...props} />
        <MainCategory name='陶 CERAMIC' tag='ceramic' {...props} />
        <SubCategory name='花器 flower vessel' tag='flower_vessel' {...props} />
        <SubCategory name='餐具 tableware' tag='tableware' {...props} />
        <SubCategory name='雕塑 sculpture' tag='sculpture' {...props} />
        <MainCategory name='木 WOOD' tag='wood' {...props} />
      </ul>
    </aside>
  )
}
export default ShopCategories
