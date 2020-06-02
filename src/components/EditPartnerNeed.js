import React, { useState, useEffect } from 'react'
import { TextInput, TextArea } from '.'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from './Dropdown'
import { useQuery } from '@apollo/react-hooks'
import { NEED_TYPES } from '../graphql'
import { useLogError } from '../hooks'

let idCounter = -1

export const EditPartnerNeed = ({ className = '', style = {}, need = {}, onChange = () => {}, onDelete, onSave }) => {
  const { data: { need_type: needTypes = [] } = {}, error } = useQuery(NEED_TYPES)

  const id = need.id || idCounter--
  const [name, setName] = useState(need.name || '')
  const [description, setDescription] = useState(need.description || '')
  const [needType, setNeedType] = useState(need.need_type)

  useEffect(() => {
    if (needTypes.length && !needType) {
      setNeedType(needTypes.find(n => n.id === need.need_type_id))
    }
  }, [needTypes])

  useLogError(error)

  useEffect(() => {
    onChange({ name, description, id, need_type_id: needType?.id })
  }, [name, description, needType])

  return <div className={`flex flex-wrap striped p-2 ${className}`}>
    <Dropdown value={needType} options={needTypes} label='Need Type (for admin purposes only)' labelKey='label' placeholder='None' onSelect={setNeedType} />
    {typeof onDelete === 'function' && <button type='button' onClick={e => onDelete(id)} className='btn ml-auto p-1 bg-red-500 text-white inline-block w-8 hover:bg-red-600 self-end'>
      <FontAwesomeIcon icon={faTimes} />
    </button>}
    <TextInput value={name} onChange={setName} label='Name/Title' className='w-full' />
    <TextArea value={description} onChange={setDescription} label='Description' className='w-full' />
    {typeof onSave === 'function' && <button className='btn btn-secondary p-2' onClick={e => onSave({
      name,
      description,
      id: id < 0 ? undefined : id,
      need_type_id: needType?.id
    })}>
      Save Need
    </button>}
  </div>
}
