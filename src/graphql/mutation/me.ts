import { gql } from '@apollo/client';

export const ME = gql`
mutation {
    me {
      error {
        message
        code
      }
      user {
        fullname
        email
        accessToken
        refreshToken
        phone
        address
        bio
        createdAt
        dob
        id 
        image
        nikname
      }
    }
  }
`;
