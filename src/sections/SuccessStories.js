import React, { useMemo, useState } from 'react'
import { useMutation, useSubscription } from '@apollo/react-hooks'
import { DisplaySuccessStory, EditSuccessStory } from '../components'
import { CREATE_SUCCESS_STORY, SUCCESS_STORIES_SUB } from '../graphql'
import { useAuth0, useLogError } from '../hooks'
import { getRole } from '../utilities'

export const SuccessStories = ({ className = '', style = {} }) => {
  const { user } = useAuth0()
  const canEdit = useMemo(() => {
    const role = getRole(user)

    return role === 'editor' || role === 'admin'
  })

  const { data: { success_story: stories = [] } = {}, error } = useSubscription(SUCCESS_STORIES_SUB)
  const [show, setShow] = useState(false)
  const [createSuccessStory, { error: createError }] = useMutation(CREATE_SUCCESS_STORY)

  useLogError(error)
  useLogError(createError)

  return <>
    {canEdit && <EditSuccessStory show={show} className='mx-auto max-w-2xl' onSave={async ({ id, ...variables }) => {
      const errorMaybe = await createSuccessStory({ variables })

      if (errorMaybe.errors) {
        alert('There was a problem creating this partner. Please check the data and try again.')

        return console.error(errorMaybe)
      }

      setShow(false)

      return true
    }} />}
    <ul className='mx-auto max-w-2xl p-2 space-y-4'>
      {stories.map(story => <li key={story.id}>
        <hr className='my-6' />
        <DisplaySuccessStory story={story} canEdit={canEdit} />
      </li>)}
    </ul>
  </>
}
