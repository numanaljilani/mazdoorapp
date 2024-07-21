import { gql } from "@apollo/client";

export const MYNOTIFICATIONS = gql`
mutation myNotifications( $skip : Float! , $take : Float!){
  myNotifications(notificationInput : {  skip :$skip , take : $take}){
    broadcast
    desc
    id
    title
    type
  }
}
`;