import {gql} from '@apollo/client';

export const loginMutation = gql`
mutation login($email :String! , $password : String! , $fcmtoken : String){
  login(loginInput : {email : $email , password : $password , fcmtoken : $fcmtoken }){
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
      isContractor
    }
  }
}
`;
export const SOCIALLOGINMUTATION = gql`
mutation($email : String! ,$socialAuthName : String! , $fcmtoken : String ){
  socialLogin(socialLoginInput:{email : $email , socialAuthName : $socialAuthName , fcmtoken : $fcmtoken}){
    error{
      code
      message
    }
    user{
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
      isContractor
    }
  }
}
`;
export const SOCIALSIGNUPMUTATION = gql`
mutation sociaSignup($fullname : String! , $email : String! ,$socialAuthname : String! , $image : String ){
  sociaSignup(socialSignupInput: {fullname : $fullname , email : $email , socialAuthName : $socialAuthname ,image : $image   }){
    error{
      code
      message
    }
    user{
      accessToken
    }
  }
}
`;
