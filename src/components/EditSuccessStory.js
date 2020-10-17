import React, { useState, useEffect, useRef } from 'react'
import { TextInput, TextArea } from '.'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const EditSuccessStory = ({
  show,
  className = '',
  style = {},
  story = {},
  onSave = () => {},
  onCancel = () => {},
  onDelete = () => {}
}) => {
  const [showForm, setShowForm] = useState(show)

  const nameRef = useRef()

  const [name, setName] = useState(story.name || '')
  const [anonymized_name, setAnonymizedName] = useState(story.anonymized_name || '')
  const [location, setLocation] = useState(story.location || '')
  const [testimonial, setTestimonial] = useState(story.testimonial || '')
  const [autoAnonymize, setAutoAnonymize] = useState(!story.anonymized_name)

  const anonymousNameHandler = anonName => {
    if (autoAnonymize) {
      setAutoAnonymize(false)
    }

    setAnonymizedName(anonName)
  }

  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    setDirty(
      (name && name !== (story.name || '')) ||
      anonymized_name !== (story.anonymized_name || '') ||
      location !== (story.location || '') ||
      testimonial !== (story.testimonial || '')
    )
  }, [name, anonymized_name, location, testimonial])

  useEffect(() => {
    if (showForm && nameRef?.current) {
      nameRef.current.focus()
    }
  }, [showForm])

  useEffect(() => {
    setShowForm(show)
  }, [show])

  useEffect(() => {
    if (autoAnonymize) {
      setAnonymizedName(anonymize(name))
    }
  }, [name, autoAnonymize])

  const resetForm = () => {
    setName('')
    setAnonymizedName('')
    setLocation('')
    setTestimonial('')
  }

  return <div className={`p-2 rounded ${className} ${showForm ? 'shadow-md my-4' : ''}`}>
    <form className='flex flex-wrap mt-4'>
      {showForm && <>
        <TextInput innerRef={nameRef} value={name} onChange={setName} label='Name' className='w-full' required />
        <div className='flex w-full'>
          <TextInput value={anonymized_name} onChange={anonymousNameHandler} label='Anonymized Name' className='w-full' />
          {!autoAnonymize && <button className='btn bg-secondary-300 text-white p-1 self-end whitespace-no-wrap ml-1' onClick={e => setAutoAnonymize(true)}>Auto-Anonymize</button>}
        </div>
        <TextInput value={location} onChange={setLocation} label='Location (optional)' className='w-full' />
        <TextArea rows='10' value={testimonial} onChange={setTestimonial} label='Testimonial'  className='w-full' />
      </>}
      <button type='button' className={`btn mr-2 ${showForm ? 'mt-2' : 'btn-secondary'}`} onClick={e => {
        onCancel()
        setShowForm(s => !s)
      }}>
        {!showForm && <FontAwesomeIcon icon={faPlus} className='mr-2' />}
        {showForm ? dirty ? 'Cancel' : 'Close' : 'Add Success Story'}
      </button>
      {showForm && <button
        type='submit'
        disabled={!dirty}
        className='btn btn-secondary mt-2'
        onClick={async e => {
          e.preventDefault()
          e.stopPropagation()

          const success = await onSave({
            id: story.id,
            name,
            anonymized_name,
            location,
            testimonial
          })

          if (success) {
            resetForm()
          }
        }}
      >
        Save
      </button>}
      {showForm && story.id && <button
        type='button'
        className='btn mt-2 ml-auto bg-red-400 hover:bg-red-500 text-white'
        onClick={e => onDelete(story.id)}
      >
        Delete
      </button>}
    </form>
  </div>
}

function anonymize (name = '') {
  return name
    .split(' ')
    .map(s => {
      const trimmed = s.trim()
      return trimmed && `${trimmed.charAt(0).toUpperCase()}.`
    })
    .filter(Boolean)
    .join(' ')
}
