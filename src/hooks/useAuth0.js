import { useContext } from 'react'
import { Auth0Context } from '../context'

export const useAuth0 = () => useContext(Auth0Context)