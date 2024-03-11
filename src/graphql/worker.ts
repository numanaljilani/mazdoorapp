import { gql } from '@apollo/client';

export const Get_Top_RatedWorkers = gql`
query  topRatedWorkers($take : Float!  $skip : Float! )  {
  topRatedWorkers(take : $take  skip: $skip){
    name
    phone
    address
    occupation
  }
}
`;

export const Get_Worker_By_Service = gql`
query{
    getWorkerByService{
      name
      phone
    }
  }`;