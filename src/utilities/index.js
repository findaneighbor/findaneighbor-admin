import { faQuestion, faCheck, faHandsHelping, faSync, faPeopleArrows, faTimes } from '@fortawesome/free-solid-svg-icons'
import auth0_shield from '../assets/auth0_shield.png'
import google_g from '../assets/google_g.png'

export const googleMapsURL = (address = '', zip = '') => `https://google.com/maps/place/${address.split(' ').join('+')},+${zip}`

export const statuses = ['requested', 'pending', 'matched', 'completed', 'ongoing', 'withdrawn']

export const getRequestStatusDecor = status => {
  switch (status) {
    case 'requested':
      return {
        icon: faQuestion,
        bgColor: 'bg-red-100',
        bgTextColor: 'text-red-600',
        textColor: 'text-red-500'
      }
    case 'pending':
      return {
        icon: faPeopleArrows,
        bgColor: 'bg-orange-100',
        bgTextColor: 'text-orange-600',
        textColor: 'text-orange-500'
      }
    case 'matched':
      return {
        icon: faHandsHelping,
        bgColor: 'bg-yellow-100',
        bgTextColor: 'text-yellow-600',
        textColor: 'text-yellow-500'
      }
    case 'completed':
      return {
        icon: faCheck,
        bgColor: 'bg-green-100',
        bgTextColor: 'text-green-600',
        textColor: 'text-green-500'
      }
    case 'ongoing':
      return {
        icon: faSync,
        bgColor: 'bg-blue-100',
        bgTextColor: 'text-blue-600',
        textColor: 'text-blue-500'
      }
    case 'withdrawn':
      return {
        icon: faTimes,
        bgColor: 'bg-gray-100',
        bgTextColor: 'text-gray-600',
        textColor: 'text-gray-500'
      }
    default:
      return {
        icon: faQuestion,
        bgColor: 'bg-gray-200',
        bgTextColor: 'text-gray-800',
        textColor: 'text-gray-700'
      }
  }
}

export const getRole = user => user?.['https://hasura.io/jwt/claims']?.['x-hasura-default-role'] ?? 'user'

export const isAuthorized = user => !!{ admin: 1, editor: 1, viewer: 1 }[getRole(user)]

export const isAdmin = user => getRole(user) === 'admin'

export const functionsEndpoint = process.env.NODE_ENV === 'production' ? 'https://functions.findaneighbor.org' : 'http://localhost:3000'

export const getAuthLogo = userId => {
  if (userId.startsWith('google')) {
    return google_g
  }

  if (userId.startsWith('auth0')) {
    return auth0_shield
  }

  return ''
}

export const externalHref = url => {
  if (url?.match(/^http:\/\/|^https:\/\//)) {
    return url
  }

  return `https://${url}`
}
