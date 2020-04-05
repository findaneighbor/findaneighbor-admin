import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from '@apollo/react-hooks'
import { useLogError } from '../hooks'
import { SET_OFFER_ACTIVE } from '../graphql'

export const ActiveStatus = ({ className = '', style = {}, active, id }) => {
  const [loadUntil, setLoadUntil] = useState(active)
  const [setActive, { error }] = useMutation(SET_OFFER_ACTIVE)

  useLogError(error)

  return <button
    className={`btn pill ${className} focus:shadow ${loadUntil !== active ? 'text-secondary-500' : active ? 'bg-secondary-400 hover:bg-secondary-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-600'}`}
    onClick={e => {
      setActive({ variables: { id, active: !active }})
      setLoadUntil(!active)
    }}
  >
    {loadUntil !== active ? <FontAwesomeIcon className='min-h-6' icon={faSpinner} spin /> : active ? 'Active' : 'Inactive'}
  </button>
}
