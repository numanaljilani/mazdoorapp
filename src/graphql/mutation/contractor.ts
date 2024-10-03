import {gql} from '@apollo/client';

export const CONTRACTORDETAILS = gql`
  mutation contractorDetails($id: String!) {
    contractorDetails(contractorDetailsInput: {id: $id}) {
      contractor {
        address
        email
        fullname
        id
        image
        price
        unit
        about
        service
        rewies
        rating
      }
    }
  }
`;
export const CONTRACTORPOSTS = gql`
  mutation ($contractorId: String!) {
    images(imagesInput: {contractorId: $contractorId}) {
      imageurl
    }
  }
`;

export const BECOMEACONTRACTOR = gql`
  mutation createContractor(
    $service: String!
    $subServices: [String!]
    $price: String
    $unit: String
    $about: String
  ) {
    createContractor(
      contractorInput: {
        service: $service
        subServices: $subServices
        price: $price
        unit: $unit
        about: $about
      }
    ) {
      contractor {
        price
        service
        subService
        about
        unit
      }
      error {
        code
        message
      }
    }
  }
`;
