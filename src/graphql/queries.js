import { gql } from 'apollo-boost';

export const REQUESTS_FOR_HELP_SUB = gql`
  subscription requestsForHelp(
    $name: String,
    $zip: String,
    $email: String,
    $phone: String,
    $needList: [Int!],
    $needStatuses: [String!],
    $order: [request_for_help_order_by!]
  ) {
    request_for_help(
      where: {
        _and: [
          { name: { _ilike: $name } },
          { zip: { _ilike: $zip } },
          { email: { _ilike: $email } },
          { phone: { _ilike: $phone } },
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
    $name: String,
    $zip: String,
    $email: String,
    $phone: String,
    $needList: [Int!],
    $advocate: Boolean,
    $order: [offer_to_help_order_by!]
  ) {
    offer_to_help(
      where: {
        _and: [
          { name: { _ilike: $name } },
          { zip: { _ilike: $zip } },
          { email: { _ilike: $email } },
          { phone: { _ilike: $phone } },
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
      active
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

export const SET_OFFER_ACTIVE = gql`
  mutation setOfferActive($active: Boolean!, $id: Int!) {
    update_offer_to_help(where: { id: { _eq: $id } }, _set: { active: $active }) {
      affected_rows
    }
  }
`

export const EMAIL_TEMPLATES = gql`
  subscription watchEmailTemplates {
    email_template (order_by: { updated_at: desc }) {
      id
      name
      subject
      message
      created_at
      updated_at
    }
  }
`

export const INSERT_EMAIL_TEMPLATE = gql`
  mutation insertEmailTemplate ($name: String!, $subject: String!, $message: String!) {
    insert_email_template(objects: { name: $name, subject: $subject, message: $message }) {
      affected_rows
    }
  }
`

export const UPDATE_EMAIL_TEMPLATE = gql`
  mutation updateEmailTemplate ($id: Int!, $name: String!, $subject: String!, $message: String!) {
    update_email_template(where: { id: { _eq: $id } }, _set: { name: $name, subject: $subject, message: $message }) {
      affected_rows
    }
  }
`
