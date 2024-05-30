import { gql } from '@apollo/client';

export const MYAPPOINTMENT = gql`
mutation myAppointment($skip : Float! , $status : String! , $take : Float!){
  myAppointment(myAppointmentInput: { skip: $skip, status: $status, take: $take }) {
    id
    contractor {
      service
      price
      subService
      unit
    }
  }
}

`;


export const BOOKANAPPOINTMENT = gql`
mutation bookAppointment($contractorId : String! , $date : String! , $time : String! ){
    bookAppointment(appointmentInput : {contractorId : $contractorId, date : $date , time : $time}){
      appointment{
        contractorId
        date
        status
        time
        userId
      }
      error{
        code
         message
      }
    }
  }
`;

