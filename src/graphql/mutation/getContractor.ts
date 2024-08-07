import { gql } from '@apollo/client';

export const GET_CONTRACTOR_BY_SERVICE = gql`
mutation($service : String! ,$skip :Float ,$take :Float  ){
    getContractor(getContractorInput :{service : $service , skip : $skip , take : $take}){
      fullname
      image
      service
      price
      id
      isBookmark
      
    }
  }
`;
export const SEARCHCONTRACTOR = gql`
mutation searchContractor($search : String! , $skip : Float! , $take : Float!){
  searchContractor(searchContractorInput:{search : $search , skip : $skip , take : $take}){
    fullname
    id
    image
    service
    subService
  }
}
`;
