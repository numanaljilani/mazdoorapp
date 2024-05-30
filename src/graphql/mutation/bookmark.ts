import { gql } from '@apollo/client';

export const ADDTOBOOKMARK = gql`
mutation addToBookmark($contractorId :String!){
    addToBookmark(bookmarkInput:{
  contractorId :$contractorId}){
    bookmark{
      message
    }
    error{
      code
       message
    }
  }
  }
`;
export const MYBOOKMARK = gql`
mutation myBookmark($service : String! ,$skip :Float ,$take :Float  ){
    myBookmark(contractors: {service : $service , skip : $skip , take : $take}){
    contractorId
        contractor{
          fullname
        }
      }
    }
`;
