import React, { useState } from 'react'
import { EditNeedType } from './EditNeedType'
import { useMutation } from '@apollo/react-hooks'
import { useLogError } from '../hooks'
import { DELETE_NEED_TYPE, UPDATE_NEED_TYPE } from '../graphql'
import { externalHref } from '../utilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export const DisplayNeedType = ({ className = '', style = {}, needType = {}, canEdit }) => {
  const [edit, setEdit] = useState(false)
  const [updateNeedType, { error: updateNeedTypeError }] = useMutation(UPDATE_NEED_TYPE)
  const [deleteNeedType, { error: deleteNeedTypeError }] = useMutation(DELETE_NEED_TYPE)

  const onSave = async (variables) => {
    const errorMaybe = await updateNeedType({ variables })

    if (errorMaybe.errors) {
      alert('There was a problem updating this success needType. Please check the data and try again.')

      return console.error(errorMaybe)
    }

    setEdit(false)
  }

  useLogError(updateNeedTypeError)
  useLogError(deleteNeedTypeError)

  return edit
    ? <EditNeedType
      needType={needType}
      onSave={onSave}
      onCancel={() => setEdit(false)}
      onDelete={id => confirm('This needType will be deleted forever! Proceed?') && deleteNeedType({ variables: { id } })}
      show
    />
    : <div>
      {canEdit && <button className='flex-center mb-2 text-left text-secondary-400 focus:text-secondary-700 focus:outline-none' onClick={e => setEdit(true)}>
        <FontAwesomeIcon icon={faEdit} className='mr-2' />
        Edit
      </button>}
      <div className={needType.hidden ? 'text-gray-400' : ''}>
        <h3 className='font-bold text-lg'>{needType.label}</h3>
        <p>Request Description: <em>{needType.request_description}</em></p>
        <p>Offer Description: <em>{needType.offer_description}</em></p>
      </div>
    </div>
}
