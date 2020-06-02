import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

export const Dropdown = ({ tabIndex, className = '', style = {}, label, value, disabled, options, onSelect, labelKey, valueKey, placeholder = 'Select One' }) => {
  const placeholderRef = useRef()
  const [show, setShow] = useState(false)
  const [shouldntClose, setShouldntClose] = useState(false)

  return <label className={`inline-flex flex-col ${className}`}>
    {label}
    <div className={`relative inline-block ${label ? 'mt-2' : ''}`}>
      <button
        type='button'
        disabled={disabled}
        tabIndex={tabIndex}
        className={`focus:outline-none focus:shadow-outline py-1 px-2 rounded-md shadow border border-secondary-300 ${disabled ? 'cursor-not-allowed bg-gray-100 text-gray-500 hover:shadow' : 'hover:shadow-md bg-white'}`}
        onClick={e => setShow(s => !s)}
        onBlur={e => {
          !shouldntClose && setShow(false)
          setShouldntClose(false)
        }}
        onKeyDown={e => {
          if (e.key === 'Tab') {
            setShouldntClose(true)
          }
        }}
      >
        {value ? (labelKey ? value[labelKey] : value) : placeholder}
        <FontAwesomeIcon icon={faCaretDown} className={`ml-2`} />
      </button>
      {show && <div className='absolute top-auto left-0 flex flex-col items-stretch rounded-lg shadow-md z-30 bg-white'>
        {placeholder && <button
          type='button'
          ref={placeholderRef}
          tabIndex={tabIndex}
          className={`p-2 flex justify-between items-center flex-no-wrap whitespace-no-wrap capitalize hover:bg-gray-200 focus:bg-gray-200 focus:outline-none cursor-pointer`}
          onClick={e => {
            e.preventDefault()

            setShow(false)
            onSelect(null)
          }}
          onMouseDown={e => e.preventDefault()}
        >
          {placeholder}
        </button>}
        {options
          .map((option, i) => <button
            type='button'
            ref={!placeholder && i === 0 ? placeholderRef : null}
            tabIndex={tabIndex}
            key={option.id || option[valueKey] || option}
            className={`p-2 flex justify-between items-center flex-no-wrap whitespace-no-wrap capitalize hover:bg-gray-200 focus:bg-gray-200 focus:outline-none cursor-pointer`}
            onClick={e => {
              e.preventDefault()

              setShow(false)
              onSelect(valueKey ? option[valueKey] : option)
            }}
            onMouseDown={e => e.preventDefault()}
          >
            {option[labelKey] || option}
          </button>)
        }
      </div>}
    </div>
  </label>
}
