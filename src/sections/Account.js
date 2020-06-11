import React, { useState, useEffect } from 'react'
import { useSubscription, useMutation } from '@apollo/react-hooks'
import { NOTIFICATION_SETTINGS_SUB, CREATE_NOTIFICATION_SETTING, UPDATE_NOTIFICATION_SETTING } from '../graphql'
import { useLogError, useAuth0 } from '../hooks'
import { getRole } from '../utilities'
import { Checkbox } from '../components'

export const Account = ({ className = '', style = {}, children }) => {
  const { user = {} } = useAuth0()
  const { data: { notification_setting_by_pk: settings } = {}, error } = useSubscription(NOTIFICATION_SETTINGS_SUB, { variables: { userId: user.sub }})
  const [createSettings, { error: createError }] = useMutation(CREATE_NOTIFICATION_SETTING)
  const [updateSettings, { error: updateError }] = useMutation(UPDATE_NOTIFICATION_SETTING)

  const [created, setCreated] = useState(!!settings)

  useEffect(() => {
    if (settings === null && !created) {
      setCreated(true)
      createSettings({ variables: { userId: user.sub } })
    }
  }, [settings, created])

  useLogError(error)
  useLogError(createError)
  useLogError(updateError)

  const [requestAdded, setRequestAdded] = useState(settings?.request_added)
  const [offerAdded, setOfferAdded] = useState(settings?.offer_added)

  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    if (settings && (requestAdded === undefined || offerAdded === undefined)) {
      setRequestAdded(settings.request_added)
      setOfferAdded(settings.offer_added)
    } else if (settings && !isDirty && (requestAdded !== settings.request_added || offerAdded !== settings.offer_added)) {
      setIsDirty(true)
    } else if (isDirty && settings && requestAdded === settings.request_added && offerAdded === settings.offer_added) {
      setIsDirty(false)
    }
  }, [settings, requestAdded, offerAdded])

  return <main className='flex flex-center p-4'>
    <div className='flex-center flex-col'>
      {user.picture && <img className='rounded-full mb-8 max-w-36' src={user.picture} alt={`${user.name}'s profile picture`} />}
      <h3 className='text-2xl text-secondary-500'>Welcome {user.name}!</h3>
      <p>Your role: <span className='capitalize font-semibold'>{getRole(user)}</span></p>
      <h2 className='text-xl text-primary-500 mt-8'>Your Email Notification Settings</h2>
      <p className='text-sm italic'>You can receive email notifications for these events.</p>
      {settings && <form className='mt-4' onSubmit={e => {
        e.preventDefault()

        updateSettings({ variables: { userId: user.sub, requestAdded, offerAdded } })
      }}>
        <Checkbox label='New Request For Help Submitted' value={requestAdded || false} onChange={setRequestAdded} />
        <Checkbox label='New Offer To Help Submitted' value={offerAdded || false} onChange={setOfferAdded} />
        {isDirty && <button type='submit' className='btn btn-secondary'>Save</button>}
      </form>}
    </div>
  </main>
}
