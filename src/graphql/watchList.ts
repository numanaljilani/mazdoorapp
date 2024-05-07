import { gql } from "@apollo/client";

export const watchList  = gql`
mutation addWorkerToWatchList($id : String!){
    addWorkerToWatchList(id : $id ){
        added
        message
    }
  }`;