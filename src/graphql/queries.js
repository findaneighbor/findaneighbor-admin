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

export const REQUEST_NEEDS_SUB = gql`
  subscription requestNeeds(
    $name: String,
    $zip: String,
    $email: String,
    $phone: String,
    $address: String,
    $needList: [Int!]
  ) {
    request_need(
      where: {
        _and: [
          {
            request_for_help: {
              _or: [
                { name: { _ilike: $name } },
                { address: { _ilike: $address } },
                { zip: { _ilike: $zip } },
                { email: { _ilike: $email } },
                { phone: { _ilike: $phone } }
              ]
            }
          },
          { need_type_id: { _in: $needList } }
        ]
      }
    ) {
      id
      created_at
      description
      status
      need_type {
        label
        id
      }
      match {
        id
        offer_need {
          id
          offer_to_help {
            id
            name
          }
        }
      }
      request_for_help {
        id
        address
        email
        name
        phone
        zip
        text_permission
        affiliations
        greeted
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
    need_type(order_by: {order: asc}) {
      id
      label
      hidden
      order
    }
  }
`

export const NEED_TYPES_SUB = gql`
  subscription NeedTypesSub {
    need_type(order_by: {order: asc}) {
      id
      label
      hidden
      order
      request_description
      offer_description
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

export const USER_SUBSCRIPTION = gql`
  subscription userSub {
    user (where: { email: { _is_null: false } }, order_by: { created_at: desc_nulls_last }) {
      email
      id
      role
      name
      picture
    }
  }
`

export const PARTNERS_SUBSCRIPTION = gql`
  subscription Partners {
    partner (order_by: { order: desc }) {
      id
      name
      website
      mission_statement
      address
      city
      state
      zip
      hours
      contact_name
      contact_email
      contact_phone
      order
      hidden
      partner_needs (order_by: { order: desc }) {
        id
        name
        description
        order
        need_type_id
        need_type {
          id
          label
        }
      }
    }
  }
`

export const NOTIFICATION_SETTINGS_SUB = gql`
  subscription NotificationSetting ($userId: String!) {
    notification_setting_by_pk(user_id: $userId) {
      user_id
      request_added
      offer_added
      match_made
      prayer_reminder
      help_completed
    }
  }
`

export const SUCCESS_STORIES_SUB = gql`
  subscription successStories {
    success_story (order_by: { order: asc }) {
      id
      name
      anonymized_name
      testimonial
      location
      order
    }
  }
`

export const BLESSING_NOMINATION_SUB = gql`
  subscription blessingNominationSub (
    $search: String,
    $statusList: [String!]
  ) {
    blessing_nomination (
      where: {
        _and: [
          {
            _or: [
              { nominator_name: { _ilike: $search } },
              { nominator_address: { _ilike: $search } },
              { nominator_zip: { _ilike: $search } },
              { nominator_email: { _ilike: $search } },
              { nominator_phone: { _ilike: $search } },
              { neighbor_name: { _ilike: $search } },
              { neighbor_address: { _ilike: $search } },
              { neighbor_zip: { _ilike: $search } },
              { nominator_affiliations: { _ilike: $search } }
            ]
          },
          { status: { _in: $statusList } }
        ]
      }
    ) {
      id
      nominator_name
      nominator_email
      nominator_phone
      nominator_text_permission
      nominator_address
      nominator_zip
      nominator_affiliations
      neighbor_name
      neighbor_address
      neighbor_zip
      reason
      financial_value
      timeframe
      status
    }
  }
`
