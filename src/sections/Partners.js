import React, { useState, useMemo } from 'react'
import { useSubscription, useMutation } from '@apollo/react-hooks'
import { PARTNERS_SUBSCRIPTION, CREATE_PARTNER } from '../graphql'
import { useLogError, useAuth0, useMedia, useRememberedState } from '../hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { TextInput, EditPartner, DisplayPartner, Dropdown } from '../components'
import { getRole } from '../utilities'

const subPageOptions = [{ value: 'partners', label: 'Partners' }, { value: 'stories', label: 'Success Stories' }]

export const Partners = ({ className = '', style = {} }) => {
  const { user } = useAuth0()
  const canEdit = useMemo(() => {
    const role = getRole(user)

    return role === 'editor' || role === 'admin'
  })

  const { data: { partner: partners = [] } = {}, error } = useSubscription(PARTNERS_SUBSCRIPTION)
  const [show, setShow] = useState(false)
  const [createPartner, { error: createError }] = useMutation(CREATE_PARTNER)

  useLogError(error)
  useLogError(createError)

  return <>
    {canEdit && <EditPartner show={show} className='mx-auto max-w-5xl' onSave={async ({ id, ...p }) => {
      const errorMaybe = await createPartner({ variables: p })

      if (errorMaybe.errors) {
        alert('There was a problem creating this partner. Please check the data and try again.')

        return console.error(errorMaybe)
      }

      setShow(false)

      return true
    }} />}
    <ul className='mx-auto max-w-5xl p-2 space-y-4'>
      {partners.map(partner => <li key={partner.id}>
        <hr className='my-6' />
        <DisplayPartner partner={partner} canEdit={canEdit} />
      </li>)}
    </ul>
  </>
}
