import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth0 } from '../hooks'
import { isAuthorized, functionsEndpoint, getRole } from '../utilities'

export const PrivateRoute = ({ component: Component, path, allowedRoles = [], ...rest }) => {
  const [authenticating, setAuthenticating] = useState(false)
  const { isAuthenticated, loginWithPopup, loading, user } = useAuth0()

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

  const render = isAuthenticated
    ? isAuthorized(user)
      ? props => <Component {...props} />
      : props => <Unauthorized {...props} />
    : props => <PleaseLogin {...props} loading={authenticating || loading} />

  if (user && allowedRoles.length && !allowedRoles.includes(getRole(user))) {
    return <Redirect to='/' />
  }

  return <Route path={path} render={render} {...rest} />
}

export const PleaseLogin = ({ isAuthenticated, loading, ...props }) => {
  const { loginWithPopup, user } = useAuth0()

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

export const Unauthorized = ({ ...props }) => {
  const { user } = useAuth0()

  return !user ? null : user.email_verified
    ? <div className='h-content flex-center flex-col p-2'>
      <h2 className='text-center text-red-400 text-2xl mb-4'>Access Restricted</h2>
      <p className='max-w-sm text-primary-500 text-justify mb-4'>
        It looks like you are not yet authorized to view anything. An administrator has been notified of your login attempt. You will receive an email when your account is approved for access.
      </p>
    </div>
    : <Unverified />
}

const Unverified = ({ ...props }) => {
  const { user, authToken } = useAuth0()
  const [fetching, setFetching] = useState(false)

  return <div className='h-content flex-center flex-col p-2'>
    <h2 className='text-center text-red-400 text-2xl mb-4'>Email Unverified</h2>
    <p className='max-w-sm text-primary-500 text-justify mb-4'>
      Your email has not yet been verified. A verification email was sent to <span className='text-secondary-500'>{user.email}</span>. After verifying, you may continue.
    </p>
    <button className='btn btn-secondary' onClick={e => window.location.reload()}>Continue</button>
    <button className='text-secondary-400 mt-4 font-light' disabled={fetching} onClick={e => {
      setFetching(true)

      fetch(`${functionsEndpoint}/resend-verification-email`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ userId: user.sub })
      })
        .then(async res => {
          setFetching(false)

          if (!res.ok) {
            console.error(res)
            const json = await res.json()
            return console.log(json)
          }

          const json = await res.json()
          console.log(json)
        })
        .catch(err => {
          console.error(err)

          setFetching(false)
        })
    }}>
      {fetching ? 'Sending...' : 'Resend Email'}
    </button>
  </div>
}
