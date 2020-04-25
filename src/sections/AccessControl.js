import React, { useState } from 'react'
import { useSubscription, useMutation } from '@apollo/react-hooks'
import { USER_SUBSCRIPTION, UPDATE_USER_ROLE } from '../graphql'
import { useLogError, useAuth0 } from '../hooks'
import { getAuthLogo } from '../utilities'
import { Dropdown } from '../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'

const roleOptions = [
  {
    id: 'user',
    name: 'Restricted',
    description: 'No access or privileges at all'
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Can view dashboard data'
  },
  {
    id: 'editor',
    name: 'Editor',
    description: 'Can view and update dashboard data'
  },
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Super user privileges and total access'
  }
]

export const AccessControl = ({ className = '', style = {}, children }) => {
  const { data: { user: users = [] } = {}, error } = useSubscription(USER_SUBSCRIPTION)

  useLogError(error)

  return <main className='flex flex-col-reverse lg:flex-row'>
    <ul className='w-full md:max-w-3xl md:mx-auto p-4'>
      <h2 className='text-3xl text-primary-500 mb-4 text-center'>Users</h2>
      {users.map(u => <UserInfo key={u.id} {...u} />)}
    </ul>
    <ul className='w-full md:max-w-xl md:mx-auto p-4 text-center'>
      <h2 className='text-xl text-primary-500 mb-4 text-center'>Permissions Breakdown</h2>
      {roleOptions.map(role => <li key={role.id} className='flex flex-col mb-2'>
        <strong>{role.name}</strong>
        <p className='font-light'>{role.description}</p>
      </li>)}
    </ul>
  </main>
}

const UserInfo = ({ picture, name, email, id, role }) => {
  const { user } = useAuth0()
  const [updateRole, { error }] = useMutation(UPDATE_USER_ROLE)

  const [currentRole, setCurrentRole] = useState(roleOptions.find(r => r.id === role) || roleOptions[0])
  const [loadUntil, setLoadUntil] = useState(false)

  const loading = loadUntil && role !== loadUntil

  useLogError(error)

  return <li key={id} className='flex flex-col sm:flex-row items-center px-2 py-4 sm:py-2 striped'>
    <div className='h-16 w-16 relative'>
      {picture
        ? <img className='w-full rounded-full' src={picture} alt='user picture' />
        : <div className='capitalize w-full h-full bg-secondary-400 text-white rounded-full flex-center text-2xl'>{name?.[0] || '?'}</div>}
      <div className='absolute bottom-0 left-0 h-4 w-4 rounded-full p-px bg-white'>
        <img className='h-full w-full' src={getAuthLogo(id)} />
      </div>
    </div>
    <div className='ml-2 my-2 text-center sm:text-left'>
      <strong className='block text-lg'>{name || '(no name)'} {user.sub === id && '(You)'}</strong>
      <em className='block'>{email}</em>
    </div>
    <div className='sm:ml-auto flex items-center'>
      {role !== currentRole.id && <button
        className='btn pill bg-green-400 hover:bg-green-500 text-white mr-2'
        onClick={async e => {
          setLoadUntil(currentRole.id)

          const updated = await updateRole({
            variables: {
              id,
              role: currentRole.id
            }
          })
            .catch(err => err instanceof Error ? err : new Error(JSON.stringify(err)))
          
          if (updated instanceof Error) {
            setLoadUntil(false)

            console.error(updated)
          }
        }}
      >
        {loading ? 'Saving' : 'Save'}
        <FontAwesomeIcon
          spin={loading}
          icon={loading ? faSpinner : faCheck}
          className='ml-2'
        />
      </button>}
      <Dropdown
        disabled={user.sub === id}
        options={roleOptions}
        value={currentRole}
        labelKey='name'
        placeholder={null}
        onSelect={val => {
          setLoadUntil(false)
          setCurrentRole(val)
        }}
      />
    </div>
  </li>
}
