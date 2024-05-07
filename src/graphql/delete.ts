import { gql } from "@apollo/client";

 export const  deletePostMeutation =  gql`mutation deletePost($postId : String!){
    deletePost(postId : $postId){
      message
      success
      
    }
  }`