import React, { useEffect, useState, Fragment } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useSubscription } from '@apollo/react-hooks'
import { Dropdown, RequestListCard, NeedCard } from '../components'
import { useRememberedState, useLogError } from '../hooks'
import { REQUEST_NEEDS_SUB } from '../graphql'
import { statuses, getRequestStatusDecor } from '../utilities'

export const KanBan = ({ className = '', style = {} }) => {
  const [variables, setVariables] = useRememberedState('requestNeedSubVariables', {
    name: null,
    zip: null,
    email: null,
    phone: null,
    needList: null
  })

  const {
    data: {
      request_need
    } = {},
    loading: requestsLoading,
    error: reqErr
  } = useSubscription(REQUEST_NEEDS_SUB, { variables })

  useLogError(reqErr)

  const [requests, setRequests] = useState({
    requested: [],
    pending: [],
    matched: [],
    completed: [],
    withdrawn: [],
    ongoing: []
  })

  useEffect(() => {
    if (Array.isArray(request_need)) {
      setRequests(request_need.reduce((state, r) => {
        state[r.status]?.push?.(r)

        return state
      }, {
        requested: [],
        pending: [],
        matched: [],
        completed: [],
        withdrawn: [],
        ongoing: []
      }))
    }
  }, [request_need])

  return <DragDropContext>
    <main className='max-h-content min-h-content flex overflow-scroll px-1 md:px-4'>
      {statuses.map(status => {
        const { icon, textColor, bgColor } = getRequestStatusDecor(status)

        return <div key={status} className='rounded-lg shadow-lg p-1 mr-4 min-w-64 flex flex-col'>
          <div className='flex justify-between p-1'>
            <h2 className={`capitalize ${textColor}`}>{status}</h2>
            <div className='pill py-0'>. . .</div>
          </div>
          <Droppable droppableId={status}>
            {({ droppableProps, placeholder, innerRef }, dropSnapshot) => (
              <ul {...droppableProps} className='rounded-md flex-grow overflow-y-scroll' ref={innerRef}>
                {requests[status].map((request, i) => (
                  <Draggable draggableId={`${request.id}`} index={i} key={request.id}>
                    {({ draggableProps, dragHandleProps, innerRef }, dragSnapshot) => (
                      <li {...draggableProps} {...dragHandleProps} ref={innerRef} className='flex-shrink-0 w-sm max-w-100vw sm:w-full mb-2 p-1 md:p-2 transition-all duration-200 ease-in-out' key={request.id}>
                        <NeedCard {...request} className='h-full' />
                      </li>
                    )}
                  </Draggable>
                ))}
                {placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      })}
    </main>
  </DragDropContext>
}
