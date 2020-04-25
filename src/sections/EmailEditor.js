import React, { useState } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { EMAIL_TEMPLATES } from '../graphql'
import { Dropdown, TemplateComposer } from '../components'
import { useLogError } from '../hooks'

const defaultTemplateOptions = [
  {
    id: 'new',
    name: 'New Template',
    subject: '',
    message: ''
  }
]

export const EmailEditor = ({ className = '', style = {} }) => {
  const { data: { email_template: emailTemplates = [] } = {}, loading, error } = useSubscription(EMAIL_TEMPLATES)
  const [template, setTemplate] = useState(null) 
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const onSelectTemplate = value => {
    if (!unsavedChanges || confirm('You will lose unsaved changes...continue?')) {
      setTemplate(value)
      setUnsavedChanges(false)
    }
  }

  useLogError(error)

  return <main className='h-content p-4 flex flex-col'>
    <div className='flex items-start justify-between'>
      <Dropdown
        tabIndex={1}
        className='mb-8'
        options={defaultTemplateOptions.concat(emailTemplates)}
        labelKey='name'
        label='Template'
        placeholder='--Select A Template--'
        value={template}
        onSelect={onSelectTemplate} />
      {unsavedChanges && <span className='bg-red-100 text-red-300 py-1 px-2 rounded'>Unsaved Changes</span>}
    </div>
    {template && <TemplateComposer template={template} setUnsavedChanges={setUnsavedChanges} />}
  </main>
}
