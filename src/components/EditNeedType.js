import React, { useState, useEffect, useRef } from 'react'
import { TextInput, TextArea } from '.'
import { Checkbox } from './Checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const EditNeedType = ({
  show,
  className = '',
  style = {},
  needType = {},
  onSave = () => {},
  onCancel = () => {},
  onDelete = () => {}
}) => {
  const [showForm, setShowForm] = useState(show)

  const labelRef = useRef()

  const [label, setLabel] = useState(needType.label || '')
  const [offer_description, setOfferDescription] = useState(needType.offer_description || '')
  const [request_description, setRequestDescription] = useState(needType.request_description || '')
  const [hidden, setHidden] = useState(needType.hidden || false)

  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    setDirty(
      (label && label !== (needType.label || '')) ||
      hidden !== (needType.hidden) ||
      offer_description !== (needType.offer_description || '') ||
      request_description !== (needType.request_description || '')
    )
  }, [label, offer_description, request_description, hidden])

  useEffect(() => {
    if (showForm && labelRef?.current) {
      labelRef.current.focus()
    }
  }, [showForm])

  useEffect(() => {
    setShowForm(show)
  }, [show])

  const resetForm = () => {
    setLabel('')
    setHidden(false)
    setOfferDescription('')
    setRequestDescription('')
  }

  return <div className={`p-2 rounded ${className} ${showForm ? 'shadow-md my-4' : ''}`}>
    <form className='flex flex-wrap mt-4'>
      {showForm && <>
        <TextInput innerRef={labelRef} value={label} onChange={setLabel} label='Label' className='w-full' required />
        <TextInput value={request_description} onChange={setRequestDescription} label='Request Description' className='w-full' />
        <TextInput value={offer_description} onChange={setOfferDescription} label='Offer Description' className='w-full' />
        <div className='w-full'>
          <Checkbox value={hidden} onChange={setHidden} label='Hide Need Type' />
        </div>
      </>}
      <button type='button' className={`btn mr-2 ${showForm ? 'mt-2' : 'btn-secondary'}`} onClick={e => {
        onCancel()
        setShowForm(s => !s)
      }}>
        {!showForm && <FontAwesomeIcon icon={faPlus} className='mr-2' />}
        {showForm ? dirty ? 'Cancel' : 'Close' : 'Add Need Type'}
      </button>
      {showForm && <button
        type='submit'
        disabled={!dirty}
        className='btn btn-secondary mt-2'
        onClick={async e => {
          e.preventDefault()
          e.stopPropagation()

          const success = await onSave({
            id: needType.id,
            label,
            offer_description,
            request_description,
            hidden
          })

          if (success) {
            resetForm()
          }
        }}
      >
        Save
      </button>}
      {showForm && needType.id && <button
        type='button'
        className='btn mt-2 ml-auto bg-red-400 hover:bg-red-500 text-white'
        onClick={e => onDelete(needType.id)}
      >
        Delete
      </button>}
    </form>
  </div>
}
