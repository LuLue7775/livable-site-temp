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

const SectionTitle = ({ title }) => {
  return (
    <li className="my-4">
      <h2 className="text-lg font-bold">─── {title} ───</h2>
    </li>
  )
}

const ComingSoon = () => {
  return (
    <li className="pl-4 italic text-gray-500">
      coming soon
    </li>
  )
}

const ShopCategories = (props) => {
  return (
    <aside data-testid='shop-categories' className='font-mono'>
      <ul>
        <SectionTitle title="HANDMADE" />
        <MainCategory name='金工 Metalwork' tag='metal' {...props} />
        <SubCategory name='耳環 Earrings' tag='earrings' {...props} />
        <SubCategory name='戒指 Ring' tag='ring' {...props} />
        <SubCategory name='項鍊 Necklace' tag='necklace' {...props} />
        <SubCategory name='手鍊 Bracelet' tag='bracelet' {...props} />
        <SubCategory name='書籤 Bookmark' tag='bookmark' {...props} />
        {/* <SubCategory name='黃銅植物飾品+寶石' tag='brass_plant_ornament_gem' {...props} />
        <SubCategory name='黃銅茶具' tag='brass_tea_set' {...props} />
        <SubCategory name='純銀植物飾品' tag='silver_plant_ornament' {...props} />
        <SubCategory name='純銀植物飾品+寶石' tag='silver_plant_ornament_gem' {...props} />
        <SubCategory name='純銀茶具' tag='silver_tea_set' {...props} />
        <SubCategory name='珐瑯飾品' tag='enamel_ornament' {...props} />
        <SubCategory name='花器+玻璃' tag='flower_vessel_glass' {...props} />
        <SubCategory name='黃銅盤' tag='brass_plate' {...props} />
        <SubCategory name='蓋罐 黃銅植物+陶' tag='brass_plant_ceramic_container' {...props} />
        <SubCategory name='零件(門把/抽屜把手)' tag='hardware_parts' {...props} /> */}
        
        <MainCategory name='陶器' tag='ceramic' {...props} />
        <ComingSoon />

        <SectionTitle title="SELECTED OBJECT" />
        <ComingSoon />

        <SectionTitle title="MADE TO ORDER" />
        <ComingSoon />
      </ul>
    </aside>
  )
}

export default ShopCategories
