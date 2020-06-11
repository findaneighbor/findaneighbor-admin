import React, { useState } from 'react'
import { EditPartner } from './EditPartner'
import { useMutation } from '@apollo/react-hooks'
import { useLogError } from '../hooks'
import { UPDATE_PARTNER, DELETE_PARTNER, UPDATE_PARTNER_NEED, CREATE_PARTNER_NEED, DELETE_PARTNER_NEED } from '../graphql'
import { externalHref } from '../utilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export const DisplayPartner = ({ className = '', style = {}, partner = {}, canEdit }) => {
  const [edit, setEdit] = useState(false)
  const [updatePartner, { error: updatePartnerError }] = useMutation(UPDATE_PARTNER)
  const [deletePartner, { error: deletePartnerError }] = useMutation(DELETE_PARTNER)
  const [updatePartnerNeed, { error: updatePartnerNeedError }] = useMutation(UPDATE_PARTNER_NEED)
  const [createPartnerNeed, { error: createPartnerNeedError }] = useMutation(CREATE_PARTNER_NEED)
  const [deletePartnerNeed, { error: deletePartnerNeedError }] = useMutation(DELETE_PARTNER_NEED)

  const onSave = async ({ needs = [], ...variables }) => {
    const deleteList = (partner.partner_needs || []).map(({ id }) => id).filter(id => id && !needs.some(n => n.id === id))

    const errorsMaybe = await Promise.all([
      updatePartner({ variables }),
      ...needs.map(need => {
        if (need.id) {
          return updatePartnerNeed({ variables: { id: need.id, ...need } })
        }

        return createPartnerNeed({ variables: { partner_id: variables.id, ...need } })
      }),
      ...deleteList.map(id => deletePartnerNeed({ variables: { id } }))
    ])

    if (errorsMaybe.some(e => e.errors)) {
      alert('There was a problem updating this partner. Please check the data and try again.')

      return console.error(errorsMaybe)
    }

    setEdit(false)
  }

  useLogError(updatePartnerError)
  useLogError(deletePartnerError)
  useLogError(updatePartnerNeedError)
  useLogError(deletePartnerNeedError)
  useLogError(createPartnerNeedError)

  const hasAddress = partner.address || partner.city || partner.state || partner.zip
  const hasContact = partner.contact_name || partner.contact_email || partner.contact_phone
  const hasNeeds = partner?.partner_needs?.length || false

  return edit
    ? <EditPartner
      partner={partner}
      onSave={onSave}
      onCancel={() => setEdit(false)}
      onDelete={id => confirm('This partner will be deleted forever! Proceed?') && deletePartner({ variables: { id } })}
      show
    />
    : <div className={partner.hidden ? 'text-gray-400' : ''}>
      <div className='flex'>
        {canEdit && <button className='w-6 text-left text-secondary-400 focus:text-secondary-700 focus:outline-none' onClick={e => setEdit(true)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>}
        <h3 className='text-2xl text-primary-500'>{partner.name}</h3>
      </div>
      {partner.website && <p className='mb-2 text-secondary-400 hover:text-secondary-500'>
        <a href={externalHref(partner.website)} target='_blank'>{partner.website}</a>
      </p>}
      {partner.mission_statement && <p className='mb-4'>{partner.mission_statement}</p>}
      <div className='flex flex-col sm:flex-row mb-4'>
        {hasContact && <div className='w-full sm:w-1/2 sm:pr-2'>
          <h4 className='text-lg font-medium'>Contact</h4>
          <p>{partner.contact_name}</p>
          <p>{partner.contact_email}</p>
          <p>{partner.contact_phone}</p>
        </div>}
        {hasAddress && <div className={`w-full sm:w-1/2 ${hasContact ? 'sm:pl-2' : ''}`}>
          <h4 className='text-lg font-medium'>Location</h4>
          <p>{partner.address}</p>
          <p>
            {partner.city}{partner.city && partner.state && ', '}{partner.state}{(partner.city || partner.state) && ' '}{partner.zip}
          </p>
          {partner.hours && <p>Hours: {partner.hours}</p>}
        </div>}
      </div>
      {hasNeeds && <div>
        <h4 className='text-lg font-medium mb-2'>Opportunities</h4>
        {partner.partner_needs.map(need => <div key={need.id} className='mb-4'>
          <h5 className='font-semibold mb-2'>
            {need.name}
            {need.need_type && <span className='text-sm font-light pill bg-primary-100 text-primary-500 ml-2'>
              {need.need_type.label}
            </span>}
          </h5>
          <p>{need.description}</p>
        </div>)}
      </div>}
    </div>
}
