import { gql } from 'apollo-boost';

export const REQUESTS_FOR_HELP_SUB = gql`
  subscription requestsForHelp(
    $zip: String,
    $needList: [Int!],
    $needStatuses: [String!],
    $order: [request_for_help_order_by!]
  ) {
    request_for_help(
      where: {
        _and: [
          { zip: { _eq: $zip } },
          { request_needs: { need_type_id: { _in: $needList } } },
          { request_needs: { status: { _in: $needStatuses } } },
        ]
      },
      order_by: $order
    ) {
      id
      created_at
      address
      email
      name
      phone
      zip
      text_permission
      affiliations
      greeted
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
  subscription offersToHelp(
    $zip: String,
    $needList: [Int!],
    $advocate: Boolean,
    $order: [offer_to_help_order_by!]
  ) {
    offer_to_help(
      where: {
        _and: [
          { zip: { _eq: $zip } },
          { offer_needs: { need_type_id: { _in: $needList } } },
          { advocate: { _eq: $advocate } }
        ]
      },
      order_by: $order
    ) {
      id
      created_at
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
      greeted
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

export const NEED_TYPES = gql`
  query NeedTypes {
    need_type(order_by: {order: asc, id: desc}) {
      id
      label
    }
  }
`

export const SET_REQUEST_GREETED = gql`
  mutation setRequestGreeted($greeted: Boolean!, $id: Int!) {
    update_request_for_help(where: { id: { _eq: $id } }, _set: { greeted: $greeted }) {
      affected_rows
    }
  }
`

export const SET_OFFER_GREETED = gql`
  mutation setOfferGreeted($greeted: Boolean!, $id: Int!) {
    update_offer_to_help(where: { id: { _eq: $id } }, _set: { greeted: $greeted }) {
      affected_rows
    }
  }
`
