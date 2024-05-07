import {gql} from '@apollo/client';
export const meMutation = gql`
  mutation Me($token: String!) {
    me(me : {token : $token}) {
      user {
        _id
        name
        phone
        address
        profile
        isWorker
        availablity
        occupation
email
        unit
        location
      }
      error {
        error
        message
      }
    }
  }
`;