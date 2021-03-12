import React, { useState } from 'react'
import { useAuth0 } from '../hooks'
import { NavLink } from 'react-router-dom'

export const AccountMenu = ({ className = '', style = {} }) => {
  const { logout, user: { picture } = { } } = useAuth0()

  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(o => !o)

  return <div className={className}>
    <button type='button' className='focus:outline-none' onClick={toggle}>
      {picture
        ? <img src={picture} alt='Your Profile Picture' className='h-10 rounded-full' />
        : 'Account'}
    </button>
    {open && <div className='absolute top-0 right-0 mt-12 flex flex-col z-50 bg-primary-600 shadow-lg'>
      <NavLink className='p-4 hover:bg-primary-500 hover:text-white' to='/account' onClick={toggle}>Account</NavLink>
      <button className='p-4 hover:bg-primary-500 hover:text-white' onClick={e => logout({ returnTo: window.location.origin })}>Logout</button>
    </div>}
  </div>
}
