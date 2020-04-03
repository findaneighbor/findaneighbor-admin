import React, { useState } from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { REQUESTS_FOR_HELP_SUB, OFFERS_TO_HELP_SUB } from '../graphql'
import { useLogError } from '../hooks'
import { RequestListCard, OfferListCard } from '../components'

export const Dashboard = ({ className = '', style = {} }) => {
  const { data: { request_for_help: requests = [] } = {}, loading: requestsLoading, error: reqErr } = useSubscription(REQUESTS_FOR_HELP_SUB)
  const { data: { offer_to_help: offers = [] } = {}, loading: offersLoading, error: offErr } = useSubscription(OFFERS_TO_HELP_SUB)

  const [showInfo, setShowInfo] = useState(false)

  useLogError(reqErr)
  useLogError(offErr)

  return <main className='max-h-content min-h-content overflow-scroll px-1 md:px-4 main-grid'>
    <h2 className='req-head text-2xl text-left text-primary-400 font-medium self-center pl-2'>Requests For Help</h2>
    <ul className='requests flex flex-no-wrap items-stretch h-auto sm:block sm:h-full overflow-scroll'>
      {requests.map(request => (
        <li className='flex-shrink-0 w-sm max-w-100vw mb-2 p-1 md:p-2' key={request.id}>
          <RequestListCard {...request} showInfo={showInfo} className='h-full' />
        </li>
      ))}
    </ul>
    <h2 className='off-head text-2xl text-left text-primary-400 font-medium self-center pl-2'>Offers To Help</h2>
    <ul className='offers flex flex-no-wrap items-stretch h-auto sm:block h-full overflow-scroll'>
      {offers.map(offer => (
        <li className='flex-shrink-0 w-sm max-w-100vw mb-2 p-1 md:p-2' key={offer.id}>
          <OfferListCard {...offer} showInfo={showInfo} className='h-full' />
        </li>
      ))}
    </ul>
    <div className='controls overflow-scroll p-1 md:p-2'>
      <button className='btn' onClick={e => setShowInfo(s => !s)}>{showInfo ? 'Collapse All' : 'Expand All'}</button>
    </div>
  </main>
}
