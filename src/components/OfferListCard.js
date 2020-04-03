import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEnvelope, faMinus, faBan, faMobileAlt, faHandHoldingHeart, faHandsHelping } from '@fortawesome/free-solid-svg-icons'
import { googleMapsURL, getRequestStatusDecor } from '../utilities'

export const OfferListCard = ({ className = '', style = {}, id, name, address, zip, email, phone, text_permission, affiliations, background, motivation, advocate, offer_needs = [], showInfo }) => {
  const [expanded, setExpanded] = useState(showInfo)

  useEffect(() => {
    setExpanded(showInfo)
  }, [showInfo])

  return <div className={`p-1 md:p-2 rounded-md shadow-md ${className}`} key={id}>
    <div className='flex justify-between'>
      <div>
        <h3 className='text-xl text-primary-500 font-semibold'>
          {advocate && <FontAwesomeIcon icon={faHandHoldingHeart} className='mr-2 text-secondary-500' />}
          {name}
        </h3>
        <a className='text-secondary-500' href={googleMapsURL(address, zip)} target='_blank' rel='noopener noreferrer'>
          {address} / {zip}
        </a>
      </div>
      <button key={id} className='w-8 h-8 self-start btn btn-secondary rounded-full shadow py-1 px-2 mr-1' onClick={() => setExpanded(e => !e)}>
        <FontAwesomeIcon icon={expanded ? faMinus : faPlus} />
      </button>
    </div>
    {expanded
      ? <>
        <div className='flex justify-between sm:flex-col md:flex-row mb-2'>
          <span className='mr-2 text-primary-400 whitespace-normal break-words'>
            <FontAwesomeIcon icon={faEnvelope} className='mr-1' />
            {email || 'none'}
          </span>
          <span className='text-primary-400 whitespace-normal break-words'>
            {phone && !text_permission && <FontAwesomeIcon icon={faBan} className='mr-1 text-red-400' />}
            <FontAwesomeIcon icon={faMobileAlt} className='mr-1' />
            {phone || 'none'}
          </span>
        </div>
        <p className='text-primary-400 mb-4'><strong className='text-primary-500'>Affiliations:</strong> {affiliations}</p>
        <p className='text-primary-400 mb-4'><strong className='text-primary-500'>Background:</strong> {background}</p>
        <p className='text-primary-400 mb-4'><strong className='text-primary-500'>Motivation:</strong> {motivation}</p>
        <div className='-mx-1 md:-mx-2'>
          <h3 className='text-lg text-secondary-500 pl-1 md:pl-2'>Offering</h3>
          {offer_needs.map(({ need_type: { label }, description, id }) => {
            return <div key={id} className='p-1 md:p-2 striped'>
              <h4 className='flex items-center text-primary-500 font-bold'>{label}</h4>
              <p className='text-primary-400'>{description}</p>
            </div>
          })}
        </div>
      </>
      : <div className='flex flex-wrap mt-4'>
        {offer_needs.map(({ need_type: { label }, status, id }) => {
          return <div key={id} className={`pill mr-2 mb-2 bg-primary-100 text-primary-600`}>
            {label}
            <FontAwesomeIcon icon={faHandsHelping} className='ml-2' />
          </div>
        })}
      </div>}
  </div>
}
