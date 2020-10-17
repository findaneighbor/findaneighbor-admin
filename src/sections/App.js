import React, { useEffect, useState } from 'react'
import { useAuth0 } from '../hooks'
import { NavLink, BrowserRouter as Router, Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { Dashboard, WebsiteEditor, EmailEditor, AccessControl, Account, KanBan } from '.'
import { PrivateRoute, PleaseLogin, Unauthorized, AccountMenu } from '../components'
import { getRole, isAuthorized, isAdmin } from '../utilities'

const linkClasses = 'px-2 sm:px-4 flex-center text-center hover:bg-primary-500 border-none leading-none'

export const App = props => {
  const { isAuthenticated, loginWithPopup, loading, logout, getIdTokenClaims, authToken, user } = useAuth0()

  const canView = isAuthorized(user)

  return <div className='h-screen'>
    {isAuthenticated && <nav className='h-12 flex bg-primary-600 shadow-lg text-gray-300 text-sm sm:text-base overflow-x-scroll'>
      {canView && <NavLink to='/legacy-dashboard' className={linkClasses} activeClassName='text-white bg-primary-500'>
        Dashboard
      </NavLink>}
      {/* {canView && <NavLink to='/dashboard' className={linkClasses} activeClassName='text-white bg-primary-500'>
        Offers/Requests
      </NavLink>} */}
      {/* <NavLink to='/email-editor' className={linkClasses} activeClassName='text-white bg-primary-500'>
        Email Editor
      </NavLink> */}
      {isAuthorized(user) && <NavLink to='/website' className={linkClasses} activeClassName='text-white bg-primary-500'>
        Website Data
      </NavLink>}
      {isAdmin(user) && <NavLink to='/access-control' className={linkClasses} activeClassName='text-white bg-primary-500'>
        User Management
      </NavLink>}
      <AccountMenu className={`ml-auto ${linkClasses}`} />
    </nav>}
    <Switch>
      <PrivateRoute allowedRoles={['admin', 'editor', 'viewer']} path='/legacy-dashboard' component={withRouter(Dashboard)} />
      <PrivateRoute allowedRoles={['admin', 'editor', 'viewer']} path='/dashboard' component={withRouter(Dashboard)} />
      <PrivateRoute allowedRoles={['admin', 'editor', 'viewer']} path='/website' component={withRouter(WebsiteEditor)} />
      <PrivateRoute allowedRoles={['admin']} path='/access-control' component={withRouter(AccessControl)} />
      <PrivateRoute allowedRoles={['admin', 'editor', 'viewer']} path='/account' component={withRouter(Account)} />
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