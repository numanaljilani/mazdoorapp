import { gql } from '@apollo/client';

export const GETPOSTS = gql`
mutation getPosts($contractorId: String!, $take: Float!, $skip: Float!) {
  getPosts(
    getPostsInput: { contractorId: $contractorId, take: $take, skip: $skip }
  ) {
    rating
    createdAt
    text
    user{
      fullname
      image
    }
  }
}

`;
export const CREATEPOSTS = gql`
mutation createPost($contractorId: String! , $rating : String! ,$serviceId:String! , $text:String ){
  createPost(postInput:{contractorId :$contractorId , rating : $rating , serviceId : $serviceId , text : $text})
  {
    createdAt
    rating
    text
  }
}
`;