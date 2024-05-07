import { gql } from "@apollo/client";

export const getWorkerProfile = gql`query getWorkerById($id : String!){
  getWorkerById(id : $id){
    _id
    name
    email
    address
    occupation
    cost
    unit
    location
    admin
    availablity
    adminVerified
    phone    
    profile
  }
}`

  

  export const availablityStatus = gql`mutation{
    availableAndUnavailable{
      availablity
      available
    }
  }`