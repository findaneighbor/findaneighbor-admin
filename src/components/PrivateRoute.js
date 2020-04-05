import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useAuth0 } from '../hooks'

export const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const [authenticating, setAuthenticating] = useState(false)
  const { isAuthenticated, loginWithPopup, loading } = useAuth0()

  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated && !loading && !authenticating) {
        setAuthenticating(true)
        await loginWithPopup({})
        setAuthenticating(false)
      }
    }
    fn()
  }, [isAuthenticated, loginWithPopup, path])

  const render = isAuthenticated ? props => <Component {...props} /> : props => <PleaseLogin {...props} loading={authenticating || loading} />

  return <Route path={path} render={render} {...rest} />
}

export const PleaseLogin = ({ isAuthenticated, loading, ...props }) => {
  const { loginWithPopup, user } = useAuth0()
  console.log(user)

  return <div className='h-full w-full flex-center flex-col'>
    <h1 className='text-primary-500 text-2xl mb-8'>Find A Neighbor Admin</h1>
    {loading
      ? <p className='throb text-secondary-500'>Logging in...</p>
      : !isAuthenticated
        ? <button className='btn btn-secondary' onClick={e => loginWithPopup({})}>Please Login</button>
        : <div className='flex-center flex-col'>
          {user.picture && <img className='rounded-full mb-8 max-w-36' src={user.picture} alt={`${user.name}'s profile picture`} />}
          <h3 className='text-xl text-secondary-500'>Welcome {user.name}!</h3>
        </div>}
  </div>
}
