import {gql} from '@apollo/client';

export const loginMutation = gql`
  mutation login($phone: Float!, $password: String!) {
    login(logindto: {phone: $phone, password: $password}) {
      user {
        _id
        name
        phone
        email
        access_token
        address
        profile
        isWorker
        availablity
        occupation
        cost
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
