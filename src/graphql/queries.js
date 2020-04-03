import { gql } from 'apollo-boost';

export const REQUESTS_FOR_HELP_SUB = gql`
  subscription requestsForHelp {
    request_for_help {
      id
      address
      email
      name
      phone
      zip
      text_permission
      affiliations
      request_needs(order_by: { need_type: { order: asc, id: desc } }) {
        id
        description
        status
        need_type {
          label
          id
        }
      }
    }
  }
`

export const OFFERS_TO_HELP_SUB = gql`
  subscription offersToHelp {
    offer_to_help {
      id
      address
      email
      name
      phone
      zip
      text_permission
      affiliations
      background
      motivation
      advocate
      offer_needs(order_by: { need_type: { order: asc, id: desc } }) {
        id
        description
        need_type {
          label
          id
        }
      }
    }
  }
`
