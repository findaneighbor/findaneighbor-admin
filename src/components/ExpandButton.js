import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

export const ExpandButton = ({ className = '', expanded, setExpanded }) => {
  return <button
    className={`btn expand-btn ${className}`}
    onClick={e => setExpanded(s => !s)}>
    <FontAwesomeIcon size='sm' icon={expanded ? faMinus : faPlus} />
  </button>
}
