import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEnvelope, faMobileAlt, faMinus, faBan, faCommentSlash, faTrash } from '@fortawesome/free-solid-svg-icons'
import { googleMapsURL, getRequestStatusDecor } from '../utilities'
import { StatusDropdown, MarkGreeted, ExpandButton } from '.'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_REQUEST } from '../graphql'
import { useLogError } from '../hooks'

export const NeedCard = ({ className = '', style = {}, id, status, description, created_at, need_type: { label }, request_for_help: { id: reqId, name, address, zip, email, phone, text_permission, affiliations, greeted } = {}, showInfo }) => {
  const [expanded, setExpanded] = useState(showInfo)
  const [markingGreeted, setMarkingGreeted] = useState(false)

  const [deleteRequest, { error }] = useMutation(DELETE_REQUEST)

  const stat = getRequestStatusDecor(status)

  useLogError(error)

  useEffect(() => {
    setExpanded(showInfo)
  }, [showInfo])

  return <div className={`p-1 md:p-2 rounded-md shadow-md bg-white ${className}`} key={id}>
    <div className='flex justify-between mb-2'>
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
      <ExpandButton expanded={expanded} setExpanded={setExpanded} />
    </div>
    {expanded
      ? <>
        <div className='flex justify-between sm:flex-col md:flex-row mb-2'>
          <span className='mr-2 text-gray-600 whitespace-normal break-words'>
            <FontAwesomeIcon icon={faEnvelope} className='mr-1 text-primary-400' />
            {email || 'none'}
          </span>
          <span className='text-gray-600 whitespace-normal break-words'>
            {phone && !text_permission && <FontAwesomeIcon icon={faBan} className='mr-1 text-red-400' />}
            <FontAwesomeIcon icon={faMobileAlt} className='mr-1 text-primary-400' />
            {phone || 'none'}
          </span>
        </div>
        <p className='mb-2 text-primary-400'>
          Signed Up: <span className='text-gray-600'>{new Date(created_at).toLocaleString('en-US')}</span>
        </p>
        <p key='affiliations' className='text-gray-600 mb-4'>
          <strong className='text-primary-400'>Affiliations:</strong> {affiliations}
        </p>
        <div className='-mx-1 md:-mx-2'>
          <h3 className='text-lg text-secondary-500 pl-2'>Need</h3>
          <div className='p-1 md:p-2 striped'>
            <h4 className='flex items-center text-primary-500 font-bold'>{label}</h4>
            <p className='text-gray-600'>{description}</p>
          </div>
        </div>
        <div className='flex-center'>
          <button type='button' className='btn py-1 px-2 bg-white hover:bg-gray-100 text-red-300 hover:text-red-500' onClick={e => {
            if (confirm('This Request For Help will be permanently deleted. Proceed?')) deleteRequest({ variables: { id } })
          }}>
            Delete
            <FontAwesomeIcon icon={faTrash} className='ml-2' />
          </button>
        </div>
      </>
      : <div className='flex flex-wrap mt-4'>
        <div key={id} className={`pill mr-2 mb-2 capitalize ${stat.bgColor} ${stat.bgTextColor}`}>
          {label}
          <FontAwesomeIcon icon={stat.icon} className='ml-2' />
        </div>
      </div>}
  </div>
}
