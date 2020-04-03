import React from 'react'

export const TextInput = ({ innerRef, labelClass = '', inputClass = '', type = 'text', placeholder, pattern, label, value, onChange, className = '', required, id }) => {
  return <div className={className}>
    <label htmlFor={id || label} className={labelClass}>
      {label} {required && <span className='text-secondary-400'>*</span>}
    </label>
    <input
      ref={innerRef}
      id={id || label}
      className={`text-input ${inputClass}`}
      pattern={pattern}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      required={required} />
  </div>
}
