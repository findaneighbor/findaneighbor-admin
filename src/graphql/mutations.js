import { gql } from 'apollo-boost'

export const UPDATE_STATUS = gql`
  mutation updateStatus($id: Int!, $status: String!) {
    update_request_need_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
      id
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
    update_email_template_by_pk(pk_columns: { id: $id }, _set: { name: $name, subject: $subject, message: $message }) {
      id
    }
  }
`

export const SET_REQUEST_GREETED = gql`
  mutation setRequestGreeted($greeted: Boolean!, $id: Int!) {
    update_request_for_help_by_pk(pk_columns: { id: $id }, _set: { greeted: $greeted }) {
      id
    }
  }
`

export const SET_OFFER_GREETED = gql`
  mutation setOfferGreeted($greeted: Boolean!, $id: Int!) {
    update_offer_to_help_by_pk(pk_columns: { id: $id }, _set: { greeted: $greeted }) {
      id
    }
  }
`

export const SET_OFFER_ACTIVE = gql`
  mutation setOfferActive($active: Boolean!, $id: Int!) {
    update_offer_to_help_by_pk(pk_columns: { id: $id }, _set: { active: $active }) {
      id
    }
  }
`

export const DELETE_REQUEST = gql`
  mutation deleteRequestForHelp ($id: Int!) {
    delete_request_for_help_by_pk(id: $id) {
      id
    }
  }
`

export const DELETE_OFFER = gql`
  mutation deleteOfferToHelp ($id: Int!) {
    delete_offer_to_help_by_pk(id: $id) {
      id
    }
  }
`

export const UPDATE_USER_ROLE = gql`
  mutation updateRole ($id: String!, $role: String) {
    update_user_by_pk (pk_columns: { id: $id }, _set: { role: $role }) {
      id
    }
  }
`

export const CREATE_PARTNER = gql`
  mutation createPartner (
    $name: String,
    $website: String,
    $address: String,
    $city: String,
    $state: String,
    $zip: String,
    $hours: String,
    $hidden: Boolean,
    $mission_statement: String,
    $contact_email: String,
    $contact_name: String,
    $contact_phone: String,
    $needs: [partner_need_insert_input!]!
  ) {
    insert_partner(objects: {
      name: $name,
      website: $website,
      address: $address,
      city: $city,
      state: $state,
      zip: $zip,
      hours: $hours,
      hidden: $hidden,
      mission_statement: $mission_statement,
      contact_email: $contact_email,
      contact_name: $contact_name,
      contact_phone: $contact_phone,
      partner_needs: { data: $needs }
    }) {
      affected_rows
    }
  }
`

export const UPDATE_PARTNER = gql`
  mutation updatePartner (
    $id: Int!,
    $name: String,
    $website: String,
    $address: String,
    $city: String,
    $state: String,
    $zip: String,
    $hours: String,
    $hidden: Boolean,
    $mission_statement: String,
    $contact_email: String,
    $contact_name: String,
    $contact_phone: String
  ) {
    update_partner_by_pk(pk_columns: { id: $id }, _set: {
      name: $name,
      website: $website,
      address: $address,
      city: $city,
      state: $state,
      zip: $zip,
      hours: $hours,
      hidden: $hidden,
      mission_statement: $mission_statement,
      contact_email: $contact_email,
      contact_name: $contact_name,
      contact_phone: $contact_phone
    }) {
      id
    }
  }
`

export const DELETE_PARTNER = gql`
  mutation deletePartner($id: Int!) {
    delete_partner_by_pk(id: $id) {
      id
    }
  }
`

export const CREATE_PARTNER_NEED = gql`
  mutation createPartnerNeed($name: String, $description: String, $need_type_id: Int, $partner_id: Int) {
    insert_partner_need(objects: {name: $name, description: $description, need_type_id: $need_type_id, partner_id: $partner_id}) {
      affected_rows
    }
  }
`

export const UPDATE_PARTNER_NEED = gql`
  mutation updatePartnerNeed($id: Int!, $name: String, $description: String, $need_type_id: Int) {
    update_partner_need_by_pk(
      pk_columns: {
        id: $id
      },
      _set: {
        name: $name,
        description: $description,
        need_type_id: $need_type_id
      }
    ) {
      id
    }
  }
`

export const DELETE_PARTNER_NEED = gql`
  mutation deletePartnerNeed($id: Int!) {
    delete_partner_need_by_pk(id: $id) {
      partner {
        id
      }
    }
  }
`

export const CREATE_NOTIFICATION_SETTING = gql`
  mutation createNotificationSetting ($userId: String!) {
    insert_notification_setting_one(object: { user_id: $userId }) {
      user_id
      created_at
    }
  }
`

export const UPDATE_NOTIFICATION_SETTING = gql`
  mutation updateNotificationSetting ($userId: String!, $requestAdded: Boolean, $offerAdded: Boolean) {
    update_notification_setting_by_pk(pk_columns: { user_id: $userId }, _set: { request_added: $requestAdded,
      offer_added: $offerAdded }) {
      user_id
    }
  }
`

export const DELETE_SUCCESS_STORY = gql`
  mutation DeleteSuccessStory ($id: Int!) {
    delete_success_story_by_pk(id: $id) {
      id
    }
  }
`

export const CREATE_SUCCESS_STORY = gql`
  mutation CreateSuccessStory(
    $testimonial: String!,
    $anonymized_name: String!,
    $name: String!,
    $location: String
  ) {
    insert_success_story(
      objects: {
        testimonial: $testimonial,
        name: $name,
        location: $location,
        anonymized_name: $anonymized_name
      }
    ) {
      returning {
        id
      }
    }
  }
`

export const UDPATE_SUCCESS_STORY = gql`
  mutation UpdateSuccessStory(
    $id: Int!,
    $testimonial: String,
    $anonymized_name: String,
    $name: String,
    $location: String
  ) {
    update_success_story_by_pk(
      pk_columns: {
        id: $id
      },
      _set: {
        testimonial: $testimonial,
        name: $name,
        location: $location,
        anonymized_name: $anonymized_name
      }
    ) {
      id
    }
  }
`

export const REORDER_SUCCESS_STORY = gql`
  mutation reorderSuccessStory(
    $id: Int!,
    $order: float8
  ) {
    update_success_story_by_pk(pk_columns: { id: $id }, _set: { order: $order }) {
      id
    }
  }
`

export const CREATE_NEED_TYPE = gql`
  mutation createNeedType ($label: String!, $offer_description: String!, $request_description: String!, $hidden: Boolean) {
    insert_need_type(
      objects: {
        label: $label,
        offer_description: $offer_description,
        request_description: $request_description,
        hidden: $hidden
      }
    ) {
      returning {
        id
      }
    }
  }
`

export const UPDATE_NEED_TYPE = gql`
  mutation updateNeedType (
    $id: Int!,
    $label: String,
    $offer_description: String,
    $request_description: String,
    $hidden: Boolean
  ) {
    update_need_type_by_pk(
      pk_columns: {
        id: $id
      },
      _set: {
        hidden: $hidden
        label: $label,
        offer_description: $offer_description,
        request_description: $request_description
      }
    ) {
      id
    }
  }
`

export const REORDER_NEED_TYPE = gql`
  mutation reorderNeedType (
    $id: Int!,
    $order: float8
  ) {
    update_need_type_by_pk(pk_columns: { id: $id }, _set: { order: $order }) {
      id
    }
  }
`

export const DELETE_NEED_TYPE = gql`
  mutation deleteNeedType ($id: Int!) {
    delete_need_type_by_pk(id: $id) {
      id
    }
  }
`
