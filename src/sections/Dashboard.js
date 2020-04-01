import React from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { REQUESTS_FOR_HELP_SUB, OFFERS_TO_HELP_SUB } from '../graphql'

export const Dashboard = ({ className = '', style = {} }) => {
  const { data: { request_for_help: requests = [] } = {}, loading: requestsLoading } = useSubscription(REQUESTS_FOR_HELP_SUB)
  const { data: { offer_to_help: offers = [] } = {}, loading: offersLoading } = useSubscription(OFFERS_TO_HELP_SUB)

  return <main className='h-content overflow-scroll p-4 flex'>
    <div className='w-1/2'>
      <ul>
        {requests.map(request => <li key={request.id}>
          <pre className='whitespace-pre-wrap'>{JSON.stringify(request, null, 2)}</pre>
        </li>)}
      </ul>
    </div>
    <div className='w-1/2'>
      <ul>
        {offers.map(offer => <li key={offer.id}>
          <pre className='whitespace-pre-wrap'>{JSON.stringify(offer, null, 2)}</pre>
        </li>)}
      </ul>
    </div>
  </main>
}
