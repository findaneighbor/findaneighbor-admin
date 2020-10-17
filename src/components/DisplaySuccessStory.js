import React, { useState } from 'react'
import { EditSuccessStory } from './EditSuccessStory'
import { useMutation } from '@apollo/react-hooks'
import { useLogError } from '../hooks'
import { DELETE_SUCCESS_STORY, UDPATE_SUCCESS_STORY } from '../graphql'
import { externalHref } from '../utilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export const DisplaySuccessStory = ({ className = '', style = {}, story = {}, canEdit }) => {
  const [edit, setEdit] = useState(false)
  const [updateSuccessStory, { error: updateSuccessStoryError }] = useMutation(UDPATE_SUCCESS_STORY)
  const [deleteSuccessStory, { error: deleteSuccessStoryError }] = useMutation(DELETE_SUCCESS_STORY)

  const onSave = async (variables) => {
    const errorMaybe = await updateSuccessStory({ variables })

    if (errorMaybe.errors) {
      alert('There was a problem updating this success story. Please check the data and try again.')

      return console.error(errorMaybe)
    }

    setEdit(false)
  }

  useLogError(updateSuccessStoryError)
  useLogError(deleteSuccessStoryError)

  return edit
    ? <EditSuccessStory
      story={story}
      onSave={onSave}
      onCancel={() => setEdit(false)}
      onDelete={id => confirm('This story will be deleted forever! Proceed?') && deleteSuccessStory({ variables: { id } })}
      show
    />
    : <div>
      {canEdit && <button className='flex-center mb-4 text-left text-secondary-400 focus:text-secondary-700 focus:outline-none' onClick={e => setEdit(true)}>
          <FontAwesomeIcon icon={faEdit} className='mr-2' />
          Edit
        </button>}
      <blockquote style={style} className={`before-quote text-lg font-serif ${className}`}>
        <p className='inline italic font-serif'>{story.testimonial}</p>
        <p className='text-right text-2xl text-secondary-500'>
          &#8212;{' '}{story.anonymized_name}{story.location && `, ${story.location}`}
        </p>
      </blockquote>
    </div>
}
