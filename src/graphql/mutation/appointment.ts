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
      id
      fullname
      image
    }
    date
    time
    status
  }
}

`;
export const MYDATEAPPOINTMENT = gql`
mutation myAppointmentByDate($date :DateTime! , $skip : Float! , $take:Float!){
  myAppointmentByDate(myAppointmentByDateInput:{date:$date , skip:$skip , take : $take}){
    id
    contractor {
      service
      price
      subService
      unit
      id
      fullname
      image
    }
    date
    time
  }
}

`;


export const BOOKANAPPOINTMENT = gql`
mutation bookAppointment($contractorId : String! , $date : String! , $time : String! ){
  bookAppointment(appointmentInput : {contractorId : $contractorId, date : $date , time : $time}){
    appointment{
      contractor{
        id
        fullname
        image
      }
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
export const CANCELAPPOINTMENT = gql`
mutation cancelAppointment($id : String!){
  cancelAppointment(cancelAppointmentInput : {id: $id}){
    appointment{
      contractor{
        fullname
      }
    }
    error{
      code
      message
    }
  }
}
`;
export const CONTRACTORAPPOITMENTS = gql`
mutation contractorAppointment($skip: Float!, $take: Float!) {
  contractorAppointment(
    contractorAppointmentInput: { skip: $skip, take: $take, status: "upcoming" }
  ) {
    date
    status
    id
    userId
    user {
      fullname 
      image
    }
    time
  }
}
`;
export const REJECTCONTRACTORAPPOITMENTS = gql`
mutation rejectAppointment( $id : String! ,){
  rejectAppointment(rejectAppointmentInput:{id : $id}){
    appointment {
     contractor{
      fullname
    }
  }
    error {
      code
      message
    }
  }
}
`;

