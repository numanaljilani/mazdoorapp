import { gql } from '@apollo/client';

export const GET_CONTRACTOR_BY_SERVICE = gql`
mutation($service : String! ,$skip :Float ,$take :Float , $subService :  String!  ){
    getContractor(getContractorInput :{service : $service , skip : $skip , take : $take , subService : , $subService}){
      fullname
      image
      service
      price
      id
      isBookmark
      rewies
      rating   
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
    rewies
    rating
  }
}
`;
