import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEnvelope, faMinus, faBan, faMobileAlt, faHandHoldingHeart, faHandsHelping, faCommentSlash, faTrash } from '@fortawesome/free-solid-svg-icons'
import { googleMapsURL, getRequestStatusDecor } from '../utilities'
import { MarkGreeted, ActiveStatus, ExpandButton } from '.'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_OFFER } from '../graphql'
import { useLogError } from '../hooks'

export const OfferListCard = ({
  className = '',
  style = {},
  id,
  created_at,
  name,
  address,
  zip,
  email,
  phone,
  text_permission,
  affiliations,
  background,
  motivation,
  advocate,
  greeted,
  active,
  offer_needs = [],
  showInfo
}) => {
  const [expanded, setExpanded] = useState(showInfo)
  const [markingGreeted, setMarkingGreeted] = useState(false)

  const [deleteOffer, { error }] = useMutation(DELETE_OFFER)

  useLogError(error)

  useEffect(() => {
    setExpanded(showInfo)
  }, [showInfo])

  return <div className={`p-1 md:p-2 rounded-md shadow-md ${className}`} key={id}>
    <div className='flex justify-between mb-2'>
      <div>
        <h3 className={`relative inline-block w-full text-xl font-semibold ${active ? greeted ? 'text-primary-500' : 'text-red-500' : 'text-gray-400'}`}>
          <a
            className='cursor-pointer'
            tabIndex='0'
            onClick={e => setMarkingGreeted(g => !g)}
            onKeyPress={e => e.key === 'Enter' && setMarkingGreeted(g => !g)}
          >
            {advocate && <FontAwesomeIcon icon={faHandHoldingHeart} className='mr-2 text-secondary-500' />}
            {name}
            {!greeted && <FontAwesomeIcon icon={faCommentSlash} className='ml-2' />}
          </a>
          {markingGreeted && <MarkGreeted id={id} greeted={greeted} hide={() => setMarkingGreeted(false)} offer />}
        </h3>
        <a className='text-secondary-500' href={googleMapsURL(address, zip)} target='_blank' rel='noopener noreferrer'>
          {address} / {zip}
        </a>
      </div>
      <ExpandButton expanded={expanded} setExpanded={setExpanded} />
    </div>
    {expanded
      ? <>
        <div className='flex justify-between sm:flex-col md:flex-row mb-2'>
          <span className='mr-2 text-gray-600 whitespace-normal break-words'>
            <FontAwesomeIcon icon={faEnvelope} className='text-primary-400 mr-1' />
            {email || 'none'}
          </span>
          <span className='text-gray-600 whitespace-normal break-words'>
            {phone && !text_permission && <FontAwesomeIcon icon={faBan} className='mr-1 text-red-400' />}
            <FontAwesomeIcon icon={faMobileAlt} className='text-primary-400 mr-1' />
            {phone || 'none'}
          </span>
        </div>
        <div className='mb-2 flex flex-wrap items-center'>
          <p className='mr-auto text-primary-400'>
            Signed Up: <span className='text-gray-600'>{new Date(created_at).toLocaleString('en-US')}</span>
          </p>
          <ActiveStatus id={id} active={active} />
        </div>
        <p className='text-gray-600 mb-2'><strong className='text-primary-400'>Affiliations:</strong> {affiliations}</p>
        <p className='text-gray-600 mb-2'><strong className='text-primary-400'>Background:</strong> {background}</p>
        <p className='text-gray-600 mb-4'><strong className='text-primary-400'>Motivation:</strong> {motivation}</p>
        <div className='-mx-1 md:-mx-2'>
          <h3 className='text-lg text-secondary-500 pl-1 md:pl-2'>Offering</h3>
          {offer_needs.map(({ need_type: { label }, description, id }) => {
            return <div key={id} className='p-1 md:p-2 striped'>
              <h4 className='flex items-center text-primary-500 font-bold'>{label}</h4>
              <p className='text-gray-600'>{description}</p>
            </div>
          })}
        </div>
        <div className='flex-center'>
          <button type='button' className='btn py-1 px-2 bg-white hover:bg-gray-100 text-red-300 hover:text-red-500' onClick={e => {
            if (confirm('This Offer To Help will be permanently deleted. Proceed?')) deleteOffer({ variables: { id } })
          }}>
            Delete
            <FontAwesomeIcon icon={faTrash} className='ml-2' />
          </button>
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
