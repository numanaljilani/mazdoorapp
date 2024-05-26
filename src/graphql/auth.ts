import {gql} from '@apollo/client';

export const loginMutation = gql`
mutation login($email :String! , $password : String!){
  login(loginInput : {email : $email , password : $password}){
    error{
      code
      message
    }
    user {
      fullname
      email
      accessToken
      refreshToken
      phone
      address
      bio
      createdAt
      dob
      id 
      image
      nikname
      
      
    }
  }
}
`;
