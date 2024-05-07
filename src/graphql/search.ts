import { gql } from "@apollo/client";

export const search_query  = gql`
mutation searchWorker($name : String! , $take :Float! ,  $skip :Float!) {
    searchWorker(name : $name take : $take skip : $skip){
      name
      _id
      occupation
      profile
    }
  }`;