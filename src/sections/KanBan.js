import React, { useEffect, useState, Fragment, useCallback } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { useSubscription, useMutation } from '@apollo/react-hooks'
import { Dropdown, RequestListCard, NeedCard, TextInput, MapBoxModal } from '../components'
import { useRememberedState, useLogError, useCustomEvent } from '../hooks'
import { REQUEST_NEEDS_SUB, UPDATE_STATUS } from '../graphql'
import { statuses, getRequestStatusDecor } from '../utilities'

export const KanBan = ({ className = '', style = {} }) => {
  const [search, setSearch] = useRememberedState('kanbanSearch', '')

  const [variables, setVariables] = useRememberedState('requestNeedSubVariables', {
    name: search ? `%${search}%` : null,
    zip: search ? `%${search}%` : null,
    email: search ? `%${search}%` : null,
    phone: search ? `%${search}%` : null,
    address: search ? `%${search}%` : null,
    needList: null
  })

  const {
    data: {
      request_need
    } = {},
    loading: requestsLoading,
    error: reqErr
  } = useSubscription(REQUEST_NEEDS_SUB, { variables })

  const [updateStatus, { error: updateStatusError }] = useMutation(UPDATE_STATUS)

  useLogError(updateStatusError)
  useLogError(reqErr)

  const [requests, setRequests] = useState({
    requested: [],
    pending: [],
    matched: [],
    completed: [],
    withdrawn: [],
    ongoing: []
  })

  const [droppedMap, setDroppedMap] = useState({})
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    if (Array.isArray(request_need)) {
      setRequests(request_need.reduce((state, r) => {
        if (droppedMap[r.id]) {
          if (droppedMap[r.id].status !== r.status) {
            state[droppedMap[r.id].status]?.push?.(r)

            return state
          }

          setDroppedMap(({ [r.id]: removed, ...m }) => m)
        }

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
  }, [request_need, droppedMap])

  const onDragEnd = async (status, { removedIndex, addedIndex, payload: request }) => {
    if (!request) return console.error('no payload?')

    if (removedIndex != null) {
      // removed from status
    }

    if (addedIndex != null) {
      setDroppedMap(m => ({ ...m, [request.id]: { status } }))

      const result = await updateStatus({ variables: { status, id: request.id } })
        .catch(err => err instanceof Error ? err : new Error(JSON.stringify(err)))
      
      if (result instanceof Error || result.errors || !result.data?.update_request_need_by_pk?.id) {
        setDroppedMap(({ [request.id]: removed, ...m }) => m)
      }

      console.log(result)
    }
  }

  useEffect(() => {
    setVariables({
      name: search ? `%${search}%` : null,
      zip: search ? `%${search}%` : null,
      email: search ? `%${search}%` : null,
      phone: search ? `%${search}%` : null,
      address: search ? `%${search}%` : null,
      needList: null
    })
  }, [search])

  const [modalValues, setModalValues] = useState(null)

  const modalOpener = useCallback(event => event?.detail?.address && event.detail.zip && setModalValues(event.detail), [])

  useCustomEvent('open-mapbox', modalOpener)

  return <main className={`max-h-content min-h-content flex flex-col`}>
    {modalValues && <MapBoxModal address={modalValues.address} zip={modalValues.zip} />}
    <div className='p-1 md:p-4 max-w-md'>
      <TextInput value={search} onChange={setSearch} placeholder='Search by name, email, phone, address, or zip' />
    </div>
    <div className='w-full overflow-scroll flex flex-grow p-1 md:p-4'>
      {statuses.map(status => {
        const { icon, textColor, bgColor } = getRequestStatusDecor(status)

        return <Container
          key={status}
          groupName="status"
          onDrop={e => onDragEnd(status, e)}
          getChildPayload={index => requests[status][index]}
          render={(ref) => {
            return <div key={status} className='rounded-lg shadow-lg p-1 mr-4 flex flex-col min-w-xs'>
              <div className='flex justify-between p-1'>
                <h2 className={`capitalize ${textColor}`}>{status}</h2>
                <div className='pill py-0'>. . .</div>
              </div>
          
              <ul ref={ref} className='rounded-md flex-grow overflow-y-scroll'>
                {requests[status].map((request, i) => (
                  <Draggable key={request.id}>
                    <li className='flex-shrink-0 w-sm max-w-100vw sm:w-full mb-2 p-1 md:p-2 transition-all duration-200 ease-in-out' key={request.id}>
                      <NeedCard {...request} className='h-full' />
                    </li>
                  </Draggable>
                ))}
              </ul>
            </div>
          }}
        />
      })}
    </div>
  </main>
}
