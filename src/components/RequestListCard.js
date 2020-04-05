import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEnvelope, faMobileAlt, faMinus, faBan, faCommentSlash } from '@fortawesome/free-solid-svg-icons'
import { googleMapsURL, getRequestStatusDecor } from '../utilities'
import { StatusDropdown, MarkGreeted } from '.'

export const RequestListCard = ({ className = '', style = {}, id, created_at, name, address, zip, email, phone, text_permission, affiliations, greeted, request_needs = [], showInfo }) => {
  const [expanded, setExpanded] = useState(showInfo)
  const [markingGreeted, setMarkingGreeted] = useState(false)

  useEffect(() => {
    setExpanded(showInfo)
  }, [showInfo])

  return <div className={`p-1 md:p-2 rounded-md shadow-md ${className}`} key={id}>
    <div className='flex justify-between'>
      <div>
        <h3 className={`relative inline-block w-full text-xl font-semibold cursor-pointer ${greeted ? 'text-primary-500' : 'text-red-500'}`}>
          <a
            className='cursor-pointer'
            tabIndex='0'
            onClick={e => setMarkingGreeted(g => !g)}
            onKeyPress={e => e.key === 'Enter' && setMarkingGreeted(g => !g)}
          >
            {name}
            {!greeted && <FontAwesomeIcon icon={faCommentSlash} className='ml-2' />}
          </a>
          {markingGreeted && <MarkGreeted id={id} greeted={greeted} hide={() => setMarkingGreeted(false)} request />}
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
        <p className='mb-2 text-primary-400'>
          Signed Up: {new Date(created_at).toLocaleString('en-US')}
        </p>
        <p key='affiliations' className='text-primary-400 mb-4'>
          <strong className='text-primary-500'>Affiliations:</strong> {affiliations}
        </p>
        <div className='-mx-1 md:-mx-2'>
          <h3 className='text-lg text-secondary-500 pl-2'>Needs</h3>
          {request_needs.map(({ need_type: { label }, status, description, id }) => {
            return <div key={id} className='p-1 md:p-2 striped'>
              <div className='flex justify-between'>
                <h4 className='flex items-center text-primary-500 font-bold'>{label}</h4>
                <StatusDropdown status={status} id={id} />
              </div>
              <p className='text-primary-400'>{description}</p>
            </div>
          })}
        </div>
      </>
      : <div className='flex flex-wrap mt-4'>
        {request_needs.map(({ need_type: { label }, status, id }) => {
          const stat = getRequestStatusDecor(status)

          return <div key={id} className={`pill mr-2 mb-2 capitalize ${stat.bgColor} ${stat.bgTextColor}`}>
            {label}
            <FontAwesomeIcon icon={stat.icon} className='ml-2' />
          </div>
        })}
      </div>}
  </div>
}
