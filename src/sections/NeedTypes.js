import React, { useMemo, useState } from 'react'
import { useMutation, useSubscription } from '@apollo/react-hooks'
import { DisplayNeedType, EditNeedType } from '../components'
import { CREATE_NEED_TYPE, NEED_TYPES_SUB } from '../graphql'
import { useAuth0, useLogError } from '../hooks'
import { getRole } from '../utilities'

export const NeedTypes = ({ className = '', style = {} }) => {
  const { user } = useAuth0()
  const canEdit = useMemo(() => {
    const role = getRole(user)

    return role === 'editor' || role === 'admin'
  })

  const { data: { need_type: needTypes = [] } = {}, error } = useSubscription(NEED_TYPES_SUB)
  const [show, setShow] = useState(false)
  const [createNeedType, { error: createError }] = useMutation(CREATE_NEED_TYPE)

  useLogError(error)
  useLogError(createError)

  return <>
    {canEdit && <EditNeedType show={show} className='mx-auto max-w-2xl' onSave={async ({ id, ...variables }) => {
      const errorMaybe = await createNeedType({ variables })

      if (errorMaybe.errors) {
        alert('There was a problem creating this partner. Please check the data and try again.')

        return console.error(errorMaybe)
      }

      setShow(false)

      return true
    }} />}
    <ul className='mx-auto max-w-2xl p-2 space-y-2'>
      {needTypes.map(needType => <li key={needType.id}>
        <hr className='my-2' />
        <DisplayNeedType needType={needType} canEdit={canEdit} />
      </li>)}
    </ul>
  </>
}
