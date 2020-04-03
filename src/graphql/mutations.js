import { gql } from 'apollo-boost';

export const UPDATE_STATUS = gql`
  mutation updateStatus($id: Int!, $status: String!) {
    update_request_need(where: { id: {_eq: $id} }, _set: { status: $status }) {
      affected_rows
    }
  }
`