import React, { useEffect, useState, useRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { INSERT_EMAIL_TEMPLATE, UPDATE_EMAIL_TEMPLATE } from '../graphql'
import { TextInput, TextArea } from '.'

export const EmailComposer = ({ className = '', style = {}, template, to: initialTo, setUnsavedChanges }) => {
  const toRef = useRef()
  const [to, setTo] = useState(initialTo)
  const [subject, setSubject] = useState(template.subject)
  const [message, setMessage] = useState(template.message)

  // const [saveTemplate] = useMutation(template.id === 'new' ? INSERT_EMAIL_TEMPLATE : UPDATE_EMAIL_TEMPLATE)

  const onSave = () => {
    if (!to || !subject || !message) {
      return
    }

    // saveTemplate({
    //   variables: {
    //     id: template.id === 'new' ? undefined : template.id,
    //     to,
    //     subject,
    //     message
    //   }
    // })

    setUnsavedChanges(false)
  }

  // useEffect(() => {
  //   setTo(template.to)
  //   setSubject(template.subject)
  //   setMessage(template.message)
  //   toRef.current.focus()
  // }, [template])

  return <div className='flex-grow flex flex-col'>
    <div className='flex items-end mb-4'>
      <TextInput innerRef={toRef} tabIndex={1} className='flex-grow' value={to} label='Recipient(s)' placeholder='Separate multiple emails with a ";" or ","' onChange={value => {
        if (value !== to) {
          setUnsavedChanges(true)
        }

        setTo(value)
      }} />
      <button tabIndex={2} className='btn btn-secondary ml-2 py-1' disabled={!to || !subject || !message} onClick={e => onSave()}>Save Template</button>
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
