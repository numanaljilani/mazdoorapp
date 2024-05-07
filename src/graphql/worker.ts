import { gql } from '@apollo/client';

export const Get_Top_RatedWorkers = gql`
mutation  topRatedWorkers($take : Float!  $skip : Float! )  {
  topRatedWorkers(take : $take  skip: $skip){
    name
    address
    occupation
    cost
    unit
    profile
    _id
  }
}
`;

export const Get_Worker_By_Service = gql`
query getWorkerByService($occupation : String!
  $take : Float!
  $skip : Float!

){
  getWorkerByService(occupation : $occupation take : $take skip : $skip){
    name  
    address
    occupation  
    profile
    _id
  } 
}`;