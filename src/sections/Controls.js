import React, { useState } from 'react'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@apollo/react-hooks'
import { NEED_TYPES } from '../graphql'
import { TextInput } from '../components'

export const Controls = ({ showInfo, setShowInfo, offerVariables, setOfferVariables, requestVariables, setRequestVariables }) => {
  const [enableRequestZipSort, setEnableRequestZipSort] = useState(requestVariables.order.zip !== null)
  const [requestZipSort, setRequestZipSort] = useState(requestVariables.order.zip)
  const [enableOfferZipSort, setEnableOfferZipSort] = useState(offerVariables.order.zip !== null)
  const [offerZipSort, setOfferZipSort] = useState(offerVariables.order.zip)

  const [requestNeedList, setRequestNeedList] = useState(
    (requestVariables.needList || []).reduce((m, k) => ({ ...m, [k]: true }), {})
  )
  const [offerNeedList, setOfferNeedList] = useState(
    (offerVariables.needList || []).reduce((m, k) => ({ ...m, [k]: true }), {})
  )
  
  const [requestNeedStatuses, setRequestNeedStatuses] = useState(
    (requestVariables.needStatuses || []).reduce((m, k) => ({ ...m, [k]: true }), {})
  )

  const { data: { need_type: needTypes = [] } = {} } = useQuery(NEED_TYPES)

  return <div className='controls overflow-scroll p-1 md:py-4'>
    <div className='flex items-center mb-4'>
      <button
        className='w-8 h-8 btn btn-secondary rounded-full shadow py-1 px-2 mr-2'
        onClick={e => setShowInfo(s => !s)}>
        <FontAwesomeIcon icon={showInfo ? faMinus : faPlus} />
      </button>
      {showInfo ? 'Collapse All' : 'Expand All'}
    </div>
    <div className='flex flex-wrap items-stretch'>
      <div className='flex flex-col mr-8 mb-4'>
        <h3 className='text-xl text-primary-400 w-full'>Request Sorting</h3>
        <div className='flex flex-wrap items-stretch'>
          <div className='border border-primary-400 rounded-md p-2 mr-2'>
            <h4 className='text-lg'>Sign Up Date</h4>
            <label className='flex items-center cursor-pointer'>
              <input
                className='mr-2'
                type='radio'
                name='request-created-order'
                checked={requestVariables.order.created_at === 'asc'}
                value='asc'
                onChange={e => {
                  const direction = e.target.value
                  
                  setRequestVariables(v => ({ ...v, order: { ...v.order, created_at: direction }}))
                }} />
              Oldest
            </label>
            <label className='flex items-center cursor-pointer'>
              <input
                className='mr-2'
                type='radio'
                name='request-created-order'
                checked={requestVariables.order.created_at === 'desc'}
                value='desc'
                onChange={e => {
                  const direction = e.target.value
                  
                  setRequestVariables(v => ({ ...v, order: { ...v.order, created_at: direction }}))
                }} />
              Newest
            </label>
          </div>
          <div className='border border-primary-400 rounded-md p-2'>
            <h4 className='text-lg'>Zip Code</h4>
            <label className='flex items-center cursor-pointer'>
              <input className='mr-2 form-checkbox' type='checkbox' checked={enableRequestZipSort} onChange={e => {
                const checked = e.target.checked
                
                setEnableRequestZipSort(checked)
                setRequestVariables(v => ({ ...v, order: { ...v.order, zip: checked ? requestZipSort : null } }))
              }} />
              Enable
            </label>
            <label className={`flex items-center cursor-pointer ${enableRequestZipSort ? '' : 'text-gray-500'}`}>
              <input
                className='mr-2'
                type='radio'
                name='request-zip-order'
                checked={requestZipSort === 'asc'}
                disabled={!enableRequestZipSort}
                value='asc'
                onChange={e => {
                  const direction = e.target.value
                  
                  setRequestZipSort(direction)
                  setRequestVariables(v => ({ ...v, order: { ...v.order, zip: direction }}))
                }} />
              Ascending
            </label>
            <label className={`flex items-center cursor-pointer ${enableRequestZipSort ? '' : 'text-gray-500'}`}>
              <input
                className='mr-2'
                type='radio'
                name='request-zip-order'
                checked={requestZipSort === 'desc'}
                disabled={!enableRequestZipSort}
                value='desc'
                onChange={e => {
                  const direction = e.target.value
                  
                  setRequestZipSort(direction)
                  setRequestVariables(v => ({ ...v, order: { ...v.order, zip: direction }}))
                }} />
              Descending
            </label>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <h3 className='text-xl text-secondary-400 w-full'>Offer Sorting</h3>
        <div className='flex flex-wrap items-stretch'>
          <div className='border border-secondary-400 rounded-md p-2 mr-2'>
            <h4 className='text-lg'>Sign Up Date</h4>
            <label className='flex items-center cursor-pointer'>
              <input
                className='mr-2'
                type='radio'
                name='offer-created-order'
                checked={offerVariables.order.created_at === 'asc'}
                value='asc'
                onChange={e => {
                  const direction = e.target.value
                  
                  setOfferVariables(v => ({ ...v, order: { ...v.order, created_at: direction }}))
                }} />
              Oldest
            </label>
            <label className='flex items-center cursor-pointer'>
              <input
                className='mr-2'
                type='radio'
                name='offer-created-order'
                checked={offerVariables.order.created_at === 'desc'}
                value='desc'
                onChange={e => {
                  const direction = e.target.value
                  
                  setOfferVariables(v => ({ ...v, order: { ...v.order, created_at: direction }}))
                }} />
              Newest
            </label>
          </div>
          <div className='border border-secondary-400 rounded-md p-2'>
            <h4 className='text-lg'>Zip Code</h4>
            <label className='flex items-center cursor-pointer'>
              <input className='mr-2 form-checkbox' type='checkbox' checked={enableOfferZipSort} onChange={e => {
                const checked = e.target.checked
                
                setEnableOfferZipSort(checked)
                setOfferVariables(v => ({ ...v, order: { ...v.order, zip: checked ? offerZipSort : null } }))
              }} />
              Enable
            </label>
            <label className={`flex items-center cursor-pointer ${enableOfferZipSort ? '' : 'text-gray-500'}`}>
              <input
                className='mr-2'
                type='radio'
                name='offer-zip-order'
                checked={offerZipSort === 'asc'}
                disabled={!enableOfferZipSort}
                value='asc'
                onChange={e => {
                  const direction = e.target.value
                  
                  setOfferZipSort(direction)
                  setOfferVariables(v => ({ ...v, order: { ...v.order, zip: direction }}))
                }} />
              Ascending
            </label>
            <label className={`flex items-center cursor-pointer ${enableOfferZipSort ? '' : 'text-gray-500'}`}>
              <input
                className='mr-2'
                type='radio'
                name='offer-zip-order'
                checked={offerZipSort === 'desc'}
                disabled={!enableOfferZipSort}
                value='desc'
                onChange={e => {
                  const direction = e.target.value
                  
                  setOfferZipSort(direction)
                  setOfferVariables(v => ({ ...v, order: { ...v.order, zip: direction }}))
                }} />
              Descending
            </label>
          </div>
        </div>
      </div>
    </div>
    <div className='flex flex-wrap items-stretch'>
      <div className='flex flex-col mr-8 mb-4 max-w-64'>
        <h3 className='text-xl text-primary-400 w-full'>Request Filtering</h3>
        <TextInput id='request-zip-filter' className='mb-4' label='Zip Code' value={requestVariables.zip || ''} onChange={value => {
            const zip = value || null

            setRequestVariables(v => ({ ...v, zip }))
          }} />
        <div className='border border-primary-400 rounded-md p-2 mb-4'>
          <span>Filter By Need</span>
          {needTypes.map(({ id, label }) => <label className='flex items-center cursor-pointer' key={id}>
            <input className='form-checkbox mr-2' type='checkbox' checked={requestNeedList[id] || false} onChange={e => {
              const checked = e.target.checked

              setRequestNeedList(l => ({ ...l, [id]: checked }))
              setRequestVariables(v => {
                const newList = checked
                  ? (v.needList || []).concat(id)
                  : (v.needList || []).filter(i => i !== id)

                return { ...v, needList: newList.length ? newList : null }
              })
            }} />
            {label}
          </label>)}
        </div>
        <div className='border border-primary-400 rounded-md p-2'>
          <span>Filter By Status</span>
          {['requested', 'greeted', 'matched', 'completed', 'ongoing'].map(status => <label className='flex items-center cursor-pointer' key={status}>
            <input className='form-checkbox mr-2' type='checkbox' checked={requestNeedStatuses[status] || false} onChange={e => {
              const checked = e.target.checked

              setRequestNeedStatuses(l => ({ ...l, [status]: checked }))
              setRequestVariables(v => {
                const newList = checked
                  ? (v.needStatuses || []).concat(status)
                  : (v.needStatuses || []).filter(s => s !== status)

                return { ...v, needStatuses: newList.length ? newList : null }
              })
            }} />
            <span className='capitalize'>{status}</span>
          </label>)}
        </div>
      </div>
      <div className='flex flex-col mb-4 max-w-64'>
        <h3 className='text-xl text-secondary-400 w-full'>Offer Filtering</h3>
        <TextInput id='offer-zip-filter' className='mb-4' label='Zip Code' value={offerVariables.zip || ''} onChange={value => {
          const zip = value || null

          setOfferVariables(v => ({ ...v, zip }))
        }} />
        <label className='flex items-center cursor-pointer mb-4'>
          <input type='checkbox' className='form-checkbox mr-2' checked={offerVariables.advocate || false} onChange={e => {
            const checked = e.target.checked
            
            setOfferVariables(v => ({ ...v, advocate: checked || null }))
          }} />
          Show Neighborhood Advocate Candidates
        </label>
        <div className='border border-secondary-400 rounded-md p-2'>
          <span>Filter By Need</span>
          {needTypes.map(({ id, label }) => <label className='flex items-center cursor-pointer' key={id}>
            <input className='form-checkbox mr-2' type='checkbox' checked={offerNeedList[id] || false} onChange={e => {
              const checked = e.target.checked

              setOfferNeedList(l => ({ ...l, [id]: checked }))
              setOfferVariables(v => {
                const newList = checked
                  ? (v.needList || []).concat(id)
                  : (v.needList || []).filter(i => i !== id)

                return { ...v, needList: newList.length ? newList : null }
              })
            }} />
            {label}
          </label>)}
        </div>
      </div>
    </div>
  </div>
}
