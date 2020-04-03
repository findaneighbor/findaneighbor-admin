import React from 'react'
import { useAuth0 } from '../hooks'
import { NavLink, BrowserRouter as Router, Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { Dashboard, WebsiteEditor } from '.'
import { PrivateRoute, PleaseLogin } from '../components'

const linkClasses = 'p-4 hover:bg-indigo-500 border-none leading-none'

export const App = props => {
  const { isAuthenticated, loginWithPopup, loading, logout } = useAuth0()

  return <div className='h-screen'>
    <nav className='h-12 flex bg-indigo-600 shadow-lg text-gray-300'>
      <NavLink to='/dashboard' className={linkClasses} activeClassName='text-white bg-indigo-500'>Data Dashboard</NavLink>
      <NavLink to='/website-editor' className={linkClasses} activeClassName='text-white bg-indigo-500'>Website Editor</NavLink>
      {isAuthenticated && <button className={`ml-auto ${linkClasses}`} onClick={e => logout({ returnTo: window.location.origin })}>Logout</button>}
    </nav>
    <Switch>
      <PrivateRoute path='/dashboard' component={withRouter(Dashboard)} />
      <PrivateRoute path='/website-editor' component={withRouter(WebsiteEditor)} />
      <Route exact path='/'>
        <PleaseLogin isAuthenticated={isAuthenticated} loading={loading} />
      </Route>
      <Redirect to='/dashboard' />
    </Switch>
  </div>
}