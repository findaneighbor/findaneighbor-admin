import React, { useEffect } from 'react'
import { useAuth0 } from '../hooks'
import { NavLink, BrowserRouter as Router, Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { Dashboard, Partners, EmailEditor, AccessControl } from '.'
import { PrivateRoute, PleaseLogin, Unauthorized } from '../components'
import { getRole, isAuthorized, isAdmin } from '../utilities'

const linkClasses = 'px-2 sm:px-4 flex-center text-center hover:bg-indigo-500 border-none leading-none'

export const App = props => {
  const { isAuthenticated, loginWithPopup, loading, logout, getIdTokenClaims, authToken, user } = useAuth0()

  const canView = isAuthorized(user)

  return <div className='h-screen'>
    {isAuthenticated && <nav className='h-12 flex bg-indigo-600 shadow-lg text-gray-300 text-sm sm:text-base overflow-x-scroll'>
      {canView && <NavLink to='/dashboard' className={linkClasses} activeClassName='text-white bg-indigo-500'>
        Data Dashboard
      </NavLink>}
      {/* <NavLink to='/email-editor' className={linkClasses} activeClassName='text-white bg-indigo-500'>
        Email Editor
      </NavLink> */}
      {isAuthorized(user) && <NavLink to='/partners' className={linkClasses} activeClassName='text-white bg-indigo-500'>
        Partners
      </NavLink>}
      {isAdmin(user) && <NavLink to='/access-control' className={linkClasses} activeClassName='text-white bg-indigo-500'>
        User Management
      </NavLink>}
      <button className={`ml-auto ${linkClasses}`} onClick={e => logout({ returnTo: window.location.origin })}>
        Logout
      </button>
    </nav>}
    <Switch>
      <PrivateRoute allowedRoles={['admin', 'editor', 'viewer']} path='/dashboard' component={withRouter(Dashboard)} />
      <PrivateRoute allowedRoles={['admin', 'editor', 'viewer']} path='/partners' component={withRouter(Partners)} />
      <PrivateRoute allowedRoles={['admin']} path='/access-control' component={withRouter(AccessControl)} />
      {/* <PrivateRoute path='/email-editor' component={withRouter(EmailEditor)} /> */}
      <Route exact path='/'>
        {user && !canView
          ? <Unauthorized />
          : <PleaseLogin isAuthenticated={isAuthenticated} loading={loading} />}
      </Route>
      <Redirect to='/dashboard' />
    </Switch>
  </div>
}