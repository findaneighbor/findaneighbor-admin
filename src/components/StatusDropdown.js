import React, { useState } from 'react'
import { getRequestStatusDecor, statuses } from '../utilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_STATUS } from '../graphql'
import { useLogError } from '../hooks'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export const StatusDropdown = ({ className = '', style = {}, status, id }) => {
  const [show, setShow] = useState(false)
  const [loadUntil, setLoadUntil] = useState(status)
  const { icon, textColor } = getRequestStatusDecor(status)

  const [updateStatus, { error }] = useMutation(UPDATE_STATUS)

  useLogError(error)

  return <div className='relative inline-block'>
    {status !== loadUntil && <FontAwesomeIcon icon={faSpinner} spin className='mr-2 text-secondary-500' />}
    <button
      className={`hover:shadow-md focus:outline-none pill shadow-none cursor-pointer capitalize ${textColor}`}
      onClick={e => setShow(s => !s)}
      onBlur={e => setShow(false)}
    >
      {status}
      <FontAwesomeIcon icon={icon} className='ml-2' />
    </button>
    {show && <ul className='absolute top-auto right-0 rounded-lg shadow-md z-30 bg-white'>
      {statuses
        .filter(s => s !== status)
        .map(s => {
          const { textColor, icon } = getRequestStatusDecor(s)

          return <li
            key={s}
            className={`p-2 flex justify-between items-center flex-no-wrap capitalize hover:bg-gray-200 cursor-pointer ${textColor}`}
            onClick={e => {
              updateStatus({ variables: { status: s, id }})
              setShow(false)
              setLoadUntil(s)
            }}
            onMouseDown={e => e.preventDefault()}
          >
            {s}
            <FontAwesomeIcon icon={icon} className='ml-2' />
          </li>
        })
      }
    </ul>}
  </div>
}
