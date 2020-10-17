import React, { useState, useEffect, useRef } from 'react'
import { TextInput, TextArea } from '.'
import { EditPartnerNeed } from './EditPartnerNeed'
import { Checkbox } from './Checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const EditPartner = ({
  show,
  className = '',
  style = {},
  partner = {},
  onSave = () => {},
  onCancel = () => {},
  onDelete = () => {}
}) => {
  const [showForm, setShowForm] = useState(show)

  const nameRef = useRef()

  const [name, setName] = useState(partner.name || '')
  const [mission_statement, setMissionStatement] = useState(partner.mission_statement || '')
  const [website, setWebsite] = useState(partner.website || '')
  const [address, setAddress] = useState(partner.address || '')
  const [city, setCity] = useState(partner.city || '')
  const [state, setState] = useState(partner.state || '')
  const [zip, setZip] = useState(partner.zip || '')
  const [hours, setHours] = useState(partner.hours || '')
  const [contact_name, setContactName] = useState(partner.contact_name || '')
  const [contact_email, setContactEmail] = useState(partner.contact_email || '')
  const [contact_phone, setContactPhone] = useState(partner.contact_phone || '')
  const [hidden, setHidden] = useState(partner.hidden || false)
  const [needs, setNeeds] = useState(partner.partner_needs || [])

  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    setDirty(
      (name && name !== (partner.name || '')) ||
      mission_statement !== (partner.mission_statement || '') ||
      website !== (partner.website || '') ||
      address !== (partner.address || '') ||
      city !== (partner.city || '') ||
      state !== (partner.state || '') ||
      zip !== (partner.zip || '') ||
      hours !== (partner.hours || '') ||
      hidden !== (partner.hidden || false) ||
      contact_name !== (partner.contact_name || '') ||
      contact_email !== (partner.contact_email || '') ||
      contact_phone !== (partner.contact_phone || '') ||
      needs.length !== (partner.partner_needs?.length || 0) ||
      needs.some(({ need_type_id, name, description, id }, i) => (
        partner.partner_needs?.[i]?.need_type_id !== need_type_id ||
        partner.partner_needs?.[i]?.name !== name ||
        partner.partner_needs?.[i]?.description !== description ||
        partner.partner_needs?.[i]?.id !== id
      ))
    )
  }, [name, mission_statement, website, address, city, state, zip, hours, hidden, contact_name, contact_email, contact_phone, needs])

  useEffect(() => {
    if (showForm && nameRef?.current) {
      nameRef.current.focus()
    }
  }, [showForm])

  useEffect(() => {
    setShowForm(show)
  }, [show])

  const resetForm = () => {
    setName('')
    setMissionStatement('')
    setWebsite('')
    setAddress('')
    setCity('')
    setState('')
    setZip('')
    setHours('')
    setContactName('')
    setContactEmail('')
    setContactPhone('')
    setHidden(false)
    setNeeds([])
  }

  return <div className={`p-2 rounded ${className} ${showForm ? 'shadow-md my-4' : ''}`}>
    <form className='flex flex-wrap mt-4'>
      {showForm && <>
        <TextInput innerRef={nameRef} value={name} onChange={setName} label='Partner Name' className='w-full' required />
        <TextArea value={mission_statement} onChange={setMissionStatement} label='Mission Statement' className='w-full' />
        <TextInput value={website} onChange={setWebsite} label='Website' className='w-full' />
        <TextInput value={address} onChange={setAddress} label='Address' className='flex-grow w-full md:w-auto' />
        <TextInput value={city} onChange={setCity} label='City' className='w-full sm:w-auto flex-grow md:ml-2' />
        <TextInput value={state} onChange={setState} label='State' className='w-16 sm:ml-2' />
        <TextInput value={zip} onChange={setZip} label='Zip' className='w-16 ml-2' />
        <TextInput value={hours} onChange={setHours} label='Hours' className='w-full' />
        <TextInput value={contact_name} onChange={setContactName} label='Contact Name' className='w-full' />
        <TextInput value={contact_email} onChange={setContactEmail} label='Contact Email' className='w-full' />
        <TextInput value={contact_phone} onChange={setContactPhone} label='Contact Phone' className='w-full' />
        <Checkbox value={hidden} onChange={setHidden} label='Hide Partner' />
        <h3 className='w-full text-xl font-semibold mt-4'>
          Needs/Opportunities
          <button type='button' className='ml-2 btn w-8 p-2' onClick={e => setNeeds(n => [...n, {}])}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </h3>
        <div className='w-full pl-2'>
          {needs.map((need, i) => <EditPartnerNeed
            key={need.id || i - (i * 2)}
            className='mt-2'
            need={need}
            onChange={n => setNeeds(nds => nds.map((k, ix) => ix === i ? n : k))}
            onDelete={id => setNeeds(nds => nds.filter(n => n.id !== id))}
          />)}
        </div>
      </>}
      <button type='button' className={`btn mr-2 ${showForm ? 'mt-2' : 'btn-secondary'}`} onClick={e => {
        onCancel()
        setShowForm(s => !s)
      }}>
        {!showForm && <FontAwesomeIcon icon={faPlus} className='mr-2' />}
        {showForm ? dirty ? 'Cancel' : 'Close' : 'Add Partner'}
      </button>
      {showForm && <button
        type='submit'
        disabled={!dirty}
        className='btn btn-secondary mt-2'
        onClick={async e => {
          e.preventDefault()
          e.stopPropagation()

          const success = await onSave({
            id: partner.id,
            name,
            mission_statement,
            website,
            address,
            city,
            state,
            zip,
            hours,
            hidden,
            contact_name,
            contact_email,
            contact_phone,
            needs: needs.map(({ id, ...n }) => ({ id: id < 0 ? undefined : id, ...n }))
          })

          if (success) {
            resetForm()
          }
        }}
      >
        Save
      </button>}
      {showForm && partner.id && <button
        type='button'
        className='btn mt-2 ml-auto bg-red-400 hover:bg-red-500 text-white'
        onClick={e => onDelete(partner.id)}
      >
        Delete
      </button>}
    </form>
  </div>
}
