import ShopItem from './ShopItem'
import { useEffect, useState } from 'react'

const ShopList = ({ products, contentDivs = [] }) => {
  const [maxRowWidth, setMaxRowWidth] = useState(7) // Default for desktop

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) { // Mobile
        setMaxRowWidth(2)
      } else if (width < 1024) { // iPad
        setMaxRowWidth(3)
      } else if (width < 1440) { // MacBook
        setMaxRowWidth(5)
      } else { // Desktop
        setMaxRowWidth(7)
      }
    }

    // Initial call
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const groupImagesIntoRows = (products) => {
    const rows = []
    let currentRow = []
    let currentRowWidth = 0

    // Calculate how often to insert a content div
    const totalItems = products?.length || 0
    const contentDivCount = contentDivs.length
    const interval = contentDivCount > 0 ? Math.floor(totalItems / contentDivCount) : 0
    let contentDivIndex = 0

    products?.forEach((product, index) => {
      const size = product.grid_size || 'sm'
      
      // Check if we should insert a content div
      // if (contentDivCount > 0 && interval > 0 && index > 0 && index % interval === 0 && contentDivIndex < contentDivCount) {
      //   if (currentRow.length > 0) {
      //     rows.push(currentRow)
      //   }
      //   rows.push([{ type: 'content', content: contentDivs[contentDivIndex] }])
      //   contentDivIndex++
      //   currentRow = []
      //   currentRowWidth = 0
      // }

      // If it's an xl size, create a new row for it
      if (size === 'xl') {
        if (currentRow.length > 0) {
          rows.push(currentRow)
        }
        rows.push([product])
        currentRow = []
        currentRowWidth = 0
      } else {
        const width = size === 'lg' ? 3 : size === 'md' ? 2 : 1

        if (currentRowWidth + width > maxRowWidth) {
          rows.push(currentRow)
          currentRow = [product]
          currentRowWidth = width
        } else {
          currentRow.push(product)
          currentRowWidth += width
        }
      }
    })

    // Add any remaining products in the current row
    if (currentRow.length > 0) {
      rows.push(currentRow)
    }

    // Add any remaining content divs
    // while (contentDivIndex < contentDivCount) {
    //   rows.push([{ type: 'content', content: contentDivs[contentDivIndex] }])
    //   contentDivIndex++
    // }

    return rows
  }

  const rows = groupImagesIntoRows(products)

  return (
    <main data-testid='shop-list' className='flex flex-col gap-[100px]'>
      {rows.map((row, rowIndex) => (
    <div key={rowIndex} className='flex flex-row gap-20'
            style={rowIndex % 2 === 1 ? { flexDirection: 'row-reverse' } : {}}  
          >
          {row.map((item, i) => (
            item.type === 'content' ? (
              <div
                key={`content-${i}`}
                className="w-[50.29%] max-w-[800px] rounded-lg bg-gray-100 p-6"
              >
                {item.content}
              </div>
            ) : (
              <div
                key={`product-${i}`}
                className={`${
                  item.grid_size === 'xl'
                    ? 'w-full max-w-[2000px]'
                    : item.grid_size === 'lg'
                    ? 'w-[42.86%] max-w-[1000px]'
                    : item.grid_size === 'md'
                    ? 'w-[28.57%] max-w-[500px]'
                    : 'w-1/2 max-w-[400px]'
                } ${
                  // Mobile: 80vw width with smaller max-width
                  'max-[768px]:w-[80vw] max-[768px]:max-w-[400px] ' +
                  // iPad and smaller: larger minimum widths
                  'max-[1400px]:min-w-[300px] ' +
                  // MacBook and Desktop: no min-width
                  'min-[1400px]:min-w-0'
                }`}
              >
                <ShopItem product={item} i={i} />
              </div>
            )
          ))}
        </div>
      ))}
    </main>
  )
}

export default ShopList
