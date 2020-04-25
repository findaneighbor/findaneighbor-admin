import { gql } from 'apollo-boost';

export const UPDATE_STATUS = gql`
  mutation updateStatus($id: Int!, $status: String!) {
    update_request_need(where: { id: {_eq: $id} }, _set: { status: $status }) {
      affected_rows
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

export const UPDATE_USER_ROLE = gql`
  mutation updateRole ($id: String!, $role: String) {
    update_user(where: { id: { _eq: $id } }, _set: { role: $role }) {
      affected_rows
    }
  }
`
