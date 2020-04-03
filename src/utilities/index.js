import { faQuestion, faCheck, faUserFriends, faSync, faRunning, faComment } from '@fortawesome/free-solid-svg-icons';

export const googleMapsURL = (address = '', zip = '') => `https://google.com/maps/place/${address.split(' ').join('+')},+${zip}`

export const getRequestStatusDecor = status => {
  switch (status) {
    case 'requested':
      return {
        icon: faQuestion,
        bgColor: 'bg-red-100',
        bgTextColor: 'text-red-600',
        textColor: 'text-red-500'
      }
    case 'greeted':
      return {
        icon: faComment,
        bgColor: 'bg-orange-100',
        bgTextColor: 'text-orange-600',
        textColor: 'text-orange-500'
      }
    case 'matched':
      return {
        icon: faUserFriends,
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
    default:
      return {
        icon: faQuestion,
        bgColor: 'bg-gray-200',
        bgTextColor: 'text-gray-800',
        textColor: 'text-gray-700'
      }
  }
}
