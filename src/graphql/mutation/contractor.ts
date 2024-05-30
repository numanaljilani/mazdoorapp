import { gql } from '@apollo/client';

export const CONTRACTORDETAILS = gql`
mutation contractorDetails($id :String!){
    contractorDetails(contractorDetailsInput :{ id :$id}){
      contractor{
        address
        email
        fullname
        id
        image
        price
        unit
        about
        service
        
      }
    }
    
  }
`;
