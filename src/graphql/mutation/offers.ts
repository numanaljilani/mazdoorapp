import {gql} from '@apollo/client';

export const ALLOFFERS = gql`
  mutation {
    AllOffers {
      desc
      id
      percent
      promo
      title
    }
  }
`;
