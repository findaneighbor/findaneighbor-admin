import React, { useState } from 'react'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@apollo/react-hooks'
import { NEED_TYPES } from '../graphql'
import { TextInput, ExpandButton } from '../components'
import { statuses } from '../utilities'

export const Controls = ({ showInfo, setShowInfo, offerVariables, setOfferVariables, requestVariables, setRequestVariables }) => {
  const [showControls, setShowControls] = useState(true)
  const [showRequestSorting, setShowRequestSorting] = useState(true)
  const [showOfferSorting, setShowOfferSorting] = useState(true)
  const [showRequestFiltering, setShowRequestFiltering] = useState(true)
  const [showOfferFiltering, setShowOfferFiltering] = useState(true)

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
    <div className='flex flex-wrap items-center mb-4'>
      <div className='flex-center my-2 mr-8'>
        <ExpandButton expanded={showInfo} setExpanded={setShowInfo} />
        <span className='ml-2'>{showInfo ? 'Collapse' : 'Expand'} All Info Cards</span>
      </div>
      <div className='flex-center my-2'>
        <ExpandButton expanded={showControls} setExpanded={setShowControls} />
        <span className='ml-2'>{showControls ? 'Hide' : 'Show'} Controls</span>
      </div>
    </div>
    {showControls && <>
      <div className='flex flex-wrap items-stretch mb-4'>
        <div className='flex flex-col mr-8 mb-4'>
          <h3 className='text-xl text-primary-400 w-full mb-2'>
            Request Sorting
            <ExpandButton expanded={showRequestSorting} setExpanded={setShowRequestSorting} className='ml-4' />
          </h3>
          {showRequestSorting && <div className='flex flex-wrap items-stretch'>
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
          </div>}
        </div>
        <div className='flex flex-col'>
          <h3 className='text-xl text-secondary-400 w-full mb-2'>
            Offer Sorting
            <ExpandButton expanded={showOfferSorting} setExpanded={setShowOfferSorting} className='ml-4' />
          </h3>
          {showOfferSorting && <div className='flex flex-wrap items-stretch'>
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
          </div>}
        </div>
      </div>
      <div className='flex flex-wrap items-stretch'>
        <div className='flex flex-col mr-8 mb-4 max-w-64'>
          <h3 className='text-xl text-primary-400 w-full mb-2'>
            Request Filtering
            <ExpandButton expanded={showRequestFiltering} setExpanded={setShowRequestFiltering} className='ml-4' />
          </h3>
          {showRequestFiltering && <>
            <TextInput id='request-name-filter' className='mb-4' label='Name' value={requestVariables.name?.split('%').join('') || ''} onChange={value => {
              const name = value ? `%${value}%` : null

              setRequestVariables(v => ({ ...v, name }))
            }} />
            <TextInput id='request-zip-filter' className='mb-4' label='Zip Code' value={requestVariables.zip?.split('%').join('') || ''} onChange={value => {
              const zip = value ? `%${value}%` : null

              setRequestVariables(v => ({ ...v, zip }))
            }} />
            <TextInput id='request-email-filter' className='mb-4' label='Email' value={requestVariables.email?.split('%').join('') || ''} onChange={value => {
              const email = value ? `%${value}%` : null

              setRequestVariables(v => ({ ...v, email }))
            }} />
            <TextInput id='request-phone-filter' className='mb-4' label='Phone' value={requestVariables.phone?.split('%').join('') || ''} onChange={value => {
              const phone = value ? `%${value}%` : null

              setRequestVariables(v => ({ ...v, phone }))
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
              {statuses.map(status => <label className='flex items-center cursor-pointer' key={status}>
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
          </>}
        </div>
        <div className='flex flex-col mb-4 max-w-64'>
          <h3 className='text-xl text-secondary-400 w-full mb-2'>
            Offer Filtering
            <ExpandButton expanded={showOfferFiltering} setExpanded={setShowOfferFiltering} className='ml-4' />
          </h3>
          {showOfferFiltering && <>
            <TextInput id='offer-name-filter' className='mb-4' label='Name' value={offerVariables.name?.split('%').join('') || ''} onChange={value => {
              const name = value ? `%${value}%` : null

              setOfferVariables(v => ({ ...v, name  }))
            }} />
            <TextInput id='offer-zip-filter' className='mb-4' label='Zip Code' value={offerVariables.zip?.split('%').join('') || ''} onChange={value => {
              const zip = value ? `%${value}%` : null

              setOfferVariables(v => ({ ...v, zip  }))
            }} />
            <TextInput id='offer-email-filter' className='mb-4' label='Email' value={offerVariables.email?.split('%').join('') || ''} onChange={value => {
              const email = value ? `%${value}%` : null

              setOfferVariables(v => ({ ...v, email  }))
            }} />
            <TextInput id='offer-phone-filter' className='mb-4' label='Phone' value={offerVariables.phone?.split('%').join('') || ''} onChange={value => {
              const phone = value ? `%${value}%` : null

              setOfferVariables(v => ({ ...v, phone  }))
            }} />
            <div className='border border-secondary-400 rounded-md p-2 mb-4'>
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
            <label className='flex items-center cursor-pointer'>
              <input type='checkbox' className='form-checkbox mr-2' checked={offerVariables.advocate || false} onChange={e => {
                const checked = e.target.checked
                
                setOfferVariables(v => ({ ...v, advocate: checked || null }))
              }} />
              Show Neighborhood Advocate Candidates
            </label>
          </>}
        </div>
      </div>
    </>}
  </div>
}
