import { useState, useEffect } from 'react'

const LOCALE = {
  '金': 'Gold',
  '銀': 'Silver',
  '玫瑰金': 'Rose Gold',
  '銅': 'Copper',
  '錫': 'Tin',
  "扁針": "Organic Curved Stem",
  "片狀": "Flat Geometry Base",
  "可調式耳夾": "Adjustable Clip Earrings",
  "耳針": "Stud Earrings",
  "圈型耳夾": "Hoop Clip Earrings",
  "大": "Large",
  "中": "Medium",
  "小": "Small",
  "公分": "cm",
  "吋": "inch",
}

const sortOptions = (options) => {
  return options.sort((a, b) => {
    // Check if both options contain numbers (like #6, #7)
    const aHasNumber = /#\d+/.test(a)
    const bHasNumber = /#\d+/.test(b)
    
    if (aHasNumber && bHasNumber) {
      // Extract numbers and sort numerically
      const aNum = parseInt(a.match(/#(\d+)/)[1])
      const bNum = parseInt(b.match(/#(\d+)/)[1])
      return aNum - bNum
    } else if (aHasNumber && !bHasNumber) {
      // Numbers come before non-numbers
      return -1
    } else if (!aHasNumber && bHasNumber) {
      // Non-numbers come after numbers
      return 1
    } else {
      // Both are non-numeric, sort using localeCompare for proper Chinese character sorting
      return a.localeCompare(b, 'zh-TW')
    }
  })
}

const translateOption = (option) => {
  // First check for exact match
  if (LOCALE[option]) {
    return LOCALE[option]
  }
  
  // Handle number + unit patterns (like "15公分", "3吋")
  const numberUnitMatch = option.match(/^(\d+(?:\.\d+)?)(.+)$/)
  if (numberUnitMatch) {
    const [, number, unit] = numberUnitMatch
    const translatedUnit = LOCALE[unit]
    if (translatedUnit) {
      return `${number}${translatedUnit}`
    }
  }
  
  // Handle patterns like "Bloom耳鉤", "Mini螺旋耳夾"
  // Check if the option contains any translatable parts
  let translated = option
  Object.entries(LOCALE).forEach(([zh, en]) => {
    if (option.includes(zh)) {
      translated = translated.replace(zh, en)
    }
  })
  
  // If translation changed the string, return it
  if (translated !== option) {
    return translated
  }
  
  // No translation found
  return null
}


const OrderedVariationSelect = ({ 
  product, 
  selectedValue, 
  handleSelectChange, 
  onCombinationChange,
  selectedCombination 
}) => {
  const [availableOptions, setAvailableOptions] = useState({})
  
  // Get ordered variation names from variation_order
  const orderedVariations = product.variation_order?.map(v => v.zh) || []
  
  // Initialize available options for the first variation
  useEffect(() => {
    if (!product.variation_combinations) return
    
    const firstVariation = orderedVariations[0]
    if (!firstVariation) return
    
    // Get all unique values for the first variation
    const firstOptions = new Set()
    Object.keys(product.variation_combinations).forEach(key => {
      const value = key.split('-')[0] // Get first part of the key
      firstOptions.add(value)
    })
    
    setAvailableOptions({
      [firstVariation]: sortOptions(Array.from(firstOptions))
    })

    // Set initial combination based on first option
    const firstOption = sortOptions(Array.from(firstOptions))[0]
    if (firstOption) {
      handleSelectChange(firstVariation, firstOption)
    }
  }, [product])

  // Update available options and selected combination when selections change
  useEffect(() => {
    if (!product.variation_combinations) return

    // For each variation after the first one
    for (let i = 1; i < orderedVariations.length; i++) {
      const currentVariation = orderedVariations[i]
      const previousVariations = orderedVariations.slice(0, i)
      
      // Check if all previous variations are selected
      const allPreviousSelected = previousVariations.every(
        prevVar => selectedValue[prevVar]
      )
      
      if (!allPreviousSelected) {
        // If any previous variation is not selected, clear current options
        setAvailableOptions(prev => ({
          ...prev,
          [currentVariation]: []
        }))
        continue
      }

      // Get available options for current variation based on previous selections
      const currentOptions = new Set()
      Object.keys(product.variation_combinations).forEach(key => {
        const values = key.split('-')
        const matchesPrevious = previousVariations.every(
          (prevVar, index) => values[index] === selectedValue[prevVar]
        )
        
        if (matchesPrevious) {
          currentOptions.add(values[i])
        }
      })
      
      setAvailableOptions(prev => ({
        ...prev,
        [currentVariation]: sortOptions(Array.from(currentOptions))
      }))

      // Auto-select first available option for subsequent variations
      if (selectedValue[currentVariation] === '' && currentOptions.size > 0) {
        handleSelectChange(currentVariation, sortOptions(Array.from(currentOptions))[0])
      }
    }

    // Update selected combination info
    const allSelected = orderedVariations.every(variation => selectedValue[variation])
    if (allSelected) {
      // Create combined key following variation_order
      const combinedKey = orderedVariations
        .map(variation => selectedValue[variation])
        .join('-')
      
      const combination = product.variation_combinations[combinedKey]
      onCombinationChange(combination)
    } else {
      onCombinationChange(null)
    }
  }, [selectedValue, product, onCombinationChange])

  if (!product.variation_combinations) return null

  return (
    <div className="my-4 md:max-w-[600px]">
      <h3 className="mb-2 leading-8">款式 Variations</h3>
      {orderedVariations.map((variationName, index) => {
        const isDisabled = index > 0 && !orderedVariations
          .slice(0, index)
          .every(prevVar => selectedValue[prevVar])

        return (
          <div key={variationName} className="mb-4 ml-4">
            <label className="text-md mb-2 block leading-8">
              {variationName} {product.variation_order[index].en}
            </label>
            <select
              value={selectedValue[variationName] || ''}
              onChange={(e) => handleSelectChange(variationName, e.target.value)}
              className="text-md w-full rounded border border-green-900/50 p-2 leading-8"
              disabled={isDisabled}
            >
              {availableOptions[variationName]?.map(option => (
                <option key={option} value={option}>
                  {option} | {translateOption(option) ? ` ${translateOption(option)}` : ''}
                </option>
              )) }
            </select>
          </div>
        )
      })}

      {/* Display price and stock information */}
      {selectedCombination && (
        <div className="ml-4 mt-4 rounded border border-green-900/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-md font-medium">NTD {selectedCombination.price}</span>
            </div>
            <div className="text-md"> 
              <span className={selectedCombination.stock > 0 ? "text-green-600" : "text-red-600" }>
                {selectedCombination.stock > 0 
                  ? `庫存 Stock: ${selectedCombination.stock}`
                  : "下單訂製 Made To Order"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderedVariationSelect