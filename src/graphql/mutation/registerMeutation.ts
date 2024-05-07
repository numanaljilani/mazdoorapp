import { gql } from "@apollo/client";

export const REGISTER_USER =gql`mutation register($email : String! , $password :String! , $fullname :String! , $nikname : String , $image : Upload ){
    register(registerInput : {email :$email , fullname : $fullname , password :$password , nikname : $nikname }  image : $image){
      error {
        code
        message
      }
      user {
        fullname
         email
        password
        image
      }
    }
  }`