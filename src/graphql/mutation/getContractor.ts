import { gql } from '@apollo/client';

export const GET_CONTRACTOR_BY_SERVICE = gql`
mutation($service : String! ,$skip :Float ,$take :Float  ){
    getContractor(getContractorInput :{service : $service , skip : $skip , take : $take}){
      fullname
      image
      service
      price
      
    }
  }
`;
