import { gql } from "@apollo/client";

export const postMutation = gql`
mutation getPosts($id : String!){
    getPosts(id : $id){
      _id
      imageUrl
      
    }
  }`