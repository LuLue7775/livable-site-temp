import React from 'react'

const VariationSelectFields = ({ variations, selectedValue, handleSelectChange }) => {
  return (
    variations && (
      <>
        <h3>款式 Variations </h3>
        {Object.entries(variations)?.map(([optionKey, options]) => {
          return (
            <div key={optionKey} className='w-[400px] border-b border-green-900/50 p-2'>
              <label htmlFor={optionKey}> {optionKey} </label>
              <select
                data-testid={`select-field-${optionKey}`}
                value={selectedValue[optionKey]}
                selected
                onChange={(e) => handleSelectChange(optionKey, e.target.value)}
                name={optionKey}
                id={optionKey}
                className='ml-4 border border-green-900/50 p-2'
              >
                {options?.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          )
        })}
      </>
    )
  )
}

export default VariationSelectFields
