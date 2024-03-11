import { gql } from '@apollo/client';

export const loginMutation = gql`mutation login($phone : Float! , $password :String! ){
  login(logindto : {phone : $phone , password : $password}){
user {
  name
  phone
  email
  access_token
  address
  profile
}
    error {
      error
      message
    }
    

  }
}`