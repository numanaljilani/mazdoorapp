import {gql} from '@apollo/client';
export const myWatchListMutation = gql`
mutation myWatchList($take: Float!, $skip: Float!) {
    myWatchList(take: $take, skip: $skip) {
        name
        workerIds
        imageUrl
        location
    }
  }
`;
