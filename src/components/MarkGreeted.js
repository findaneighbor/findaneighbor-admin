import React, { useRef, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SET_REQUEST_GREETED, SET_OFFER_GREETED } from '../graphql'
import { useLogError } from '../hooks'

export const MarkGreeted = ({ className = '', style = {}, id, greeted, hide = () => null, request, offer }) => {
  const [setGreeted, { error }] = useMutation(request ? SET_REQUEST_GREETED : SET_OFFER_GREETED)
  const ref = useRef()

  useEffect(() => ref?.current?.focus?.(), [])

  useLogError(error)

  return <div className={`absolute top-auto left-0 rounded-md shadow-md bg-white ${className}`}>
    <button
      ref={ref}
      className='btn text-primary-500'
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        setGreeted({ variables: { id, greeted: !greeted }})
        hide()
      }}
      onBlur={e => hide()}>
      Mark as{greeted ? ' Not ': ' '}Greeted
    </button>
  </div>
}
