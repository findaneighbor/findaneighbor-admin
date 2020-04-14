import React, { useEffect, useState, useRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { INSERT_EMAIL_TEMPLATE, UPDATE_EMAIL_TEMPLATE } from '../graphql'
import { TextInput, TextArea } from '.'

export const TemplateComposer = ({ className = '', style = {}, template, setUnsavedChanges }) => {
  const nameRef = useRef()
  const [name, setName] = useState(template.name)
  const [subject, setSubject] = useState(template.subject)
  const [message, setMessage] = useState(template.message)

  const [saveTemplate] = useMutation(template.id === 'new' ? INSERT_EMAIL_TEMPLATE : UPDATE_EMAIL_TEMPLATE)

  const onSave = () => {
    if (!name || !subject || !message) {
      return
    }

    saveTemplate({
      variables: {
        id: template.id === 'new' ? undefined : template.id,
        name,
        subject,
        message
      }
    })

    setUnsavedChanges(false)
  }

  useEffect(() => {
    setName(template.name)
    setSubject(template.subject)
    setMessage(template.message)
    nameRef.current.focus()
  }, [template])

  return <div className='flex-grow flex flex-col'>
    <div className='flex items-end mb-4'>
      <TextInput innerRef={nameRef} tabIndex={1} className='flex-grow' value={name} label='Template Name' onChange={value => {
        if (value !== name) {
          setUnsavedChanges(true)
        }

        setName(value)
      }} />
      <button tabIndex={2} className='btn btn-secondary ml-2 py-1' disabled={!name || !subject || !message} onClick={e => onSave()}>Save Template</button>
    </div>
    <TextInput tabIndex={1} className='mb-4' value={subject} label='Subject' onChange={value => {
      if (value !== subject) {
        setUnsavedChanges(true)
      }

      setSubject(value)
    }} />
    <TextArea tabIndex={1} className='mb-4 flex-grow flex flex-col' inputClass='flex-grow' value={message} label='Message' onChange={value => {
      if (value !== message) {
        setUnsavedChanges(true)
      }

      setMessage(value)
    }} />
  </div>
}
