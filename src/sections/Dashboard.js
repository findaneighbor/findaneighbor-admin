import React, { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { REQUESTS_FOR_HELP_SUB, OFFERS_TO_HELP_SUB } from '../graphql'
import { useLogError } from '../hooks'
import { RequestListCard, OfferListCard } from '../components'
import { Controls } from '.'
import { statuses } from '../utilities'

export const Dashboard = ({ className = '', style = {} }) => {
  const [offerVariables, setOfferVariables] = useState({
    zip: null,
    needList: null,
    advocate: null,
    order: {
      created_at: 'desc',
      zip: null
    }
  })
  const [requestVariables, setRequestVariables] = useState({
    zip: null,
    needList: null,
    needStatuses: statuses.filter(s => !['completed', 'withdrawn'].includes(s)),
    order: {
      created_at: 'desc',
      zip: null
    }
  })

  const {
    data: {
      request_for_help
    } = {},
    loading: requestsLoading,
    error: reqErr
  } = useSubscription(REQUESTS_FOR_HELP_SUB, { variables: requestVariables })
  const {
    data: {
      offer_to_help
    } = {},
    loading: offersLoading,
    error: offErr
  } = useSubscription(OFFERS_TO_HELP_SUB, { variables: offerVariables })

  const [offers, setOffers] = useState(offer_to_help || [])
  const [requests, setRequests] = useState(request_for_help || [])

  const [showInfo, setShowInfo] = useState(false)

  useLogError(reqErr)
  useLogError(offErr)

  useEffect(() => offer_to_help && setOffers(offer_to_help), [offer_to_help])
  useEffect(() => request_for_help && setRequests(request_for_help), [request_for_help])

  return <main className='max-h-content min-h-content overflow-scroll px-1 md:px-4 main-grid'>
    <h2 className='req-head text-2xl text-left text-primary-400 font-medium self-center pl-2'>Requests For Help</h2>
    <ul className='requests flex flex-no-wrap items-stretch h-auto sm:block sm:h-full overflow-scroll'>
      {requests.map(request => (
        <li className='flex-shrink-0 w-sm max-w-100vw sm:w-full mb-2 p-1 md:p-2 transition-all duration-200 ease-in-out' key={request.id}>
          <RequestListCard {...request} showInfo={showInfo} className='h-full' />
        </li>
      ))}
    </ul>
    <h2 className='off-head text-2xl text-left text-secondary-400 font-medium self-center pl-2'>Offers To Help</h2>
    <ul className='offers flex flex-no-wrap items-stretch h-auto sm:block h-full overflow-scroll'>
      {offers.map(offer => (
        <li className='flex-shrink-0 w-sm max-w-100vw sm:w-full mb-2 p-1 md:p-2 transition-all duration-200 ease-in-out' key={offer.id}>
          <OfferListCard {...offer} showInfo={showInfo} className='h-full' />
        </li>
      ))}
    </ul>
    <Controls {...{ showInfo, setShowInfo, offerVariables, setOfferVariables, requestVariables, setRequestVariables }} />
  </main>
}
