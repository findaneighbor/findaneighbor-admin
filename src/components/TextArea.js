import React from 'react'

export const TextArea = ({ innerRef, placeholder, label, labelClass = '', value, tabIndex, onChange, className = '', inputClass='', required, id }) => {
  return <div className={className}>
    <label htmlFor={label} className={labelClass}>
      {label} {required && <span className='text-secondary-400'>*</span>}
    </label>
    <textarea
      ref={innerRef}
      id={id || label}
      className={`form-description ${inputClass}`}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      tabIndex={tabIndex}
      required={required} />
  </div>
}
