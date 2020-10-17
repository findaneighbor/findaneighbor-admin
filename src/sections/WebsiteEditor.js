import React, { useState, useMemo } from 'react'
import { useSubscription, useMutation } from '@apollo/react-hooks'
import { PARTNERS_SUBSCRIPTION, CREATE_PARTNER } from '../graphql'
import { useLogError, useAuth0, useMedia, useRememberedState } from '../hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { TextInput, EditPartner, DisplayPartner, Dropdown } from '../components'
import { getRole } from '../utilities'
import { Partners, SuccessStories, NeedTypes } from '.'

const subPageOptions = [
  { value: 'partners', label: 'Partners' },
  { value: 'stories', label: 'Success Stories' },
  { value: 'need-types', label: 'Need Types' }
]

export const WebsiteEditor = ({ className = '', style = {} }) => {
  const { user } = useAuth0()
  const canEdit = useMemo(() => {
    const role = getRole(user)

    return role === 'editor' || role === 'admin'
  })

  const isSmallScreen = useMedia(['(min-width: 768px)'], [false], true)
  const [subPage, setSubPage] = useRememberedState('website.subpage', subPageOptions[0])

  const { data: { partner: partners = [] } = {}, error } = useSubscription(PARTNERS_SUBSCRIPTION)
  const [show, setShow] = useState(false)
  const [createPartner, { error: createError }] = useMutation(CREATE_PARTNER)

  useLogError(error)
  useLogError(createError)

  return <div className='flex flex-no-wrap'>
    {!isSmallScreen && <aside className='w-48 border-r border-gray-300'>
      <ul>
        {subPageOptions.map(option => {
          return <li
            key={option.value}
            className={`p-4 cursor-pointer text-primary-500 ${subPage.value === option.value ? 'bg-gray-200' : ''}`}
            onClick={e => setSubPage(option)}
          >
            {option.label}
          </li>
        })}
      </ul>
    </aside>}
    <main className='flex-grow items-center h-content overflow-y-scroll p-4'>
      {isSmallScreen
        ? <Dropdown
          className='flex-center'
          placeholder={null}
          labelKey='label'
          value={subPage}
          onSelect={p => setSubPage(p)}
          options={subPageOptions}
        />
        : <h2 className='text-center text-2xl text-primary-500'>{subPage.label}</h2>}
      {subPage.value === 'partners' && <Partners />}
      {subPage.value === 'stories' && <SuccessStories />}
      {subPage.value === 'need-types' && <NeedTypes />}
    </main>
  </div>
}
