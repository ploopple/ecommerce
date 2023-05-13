import { gql } from "@apollo/client"

export const ADD_NEW_PRODUCT = gql`
mutation CreateNewProduct($req: ProductInput!) {
    CreateNewProduct(req: $req) {
        id
        name
        description
        price
        stocks
        userId
        image
        createdBy
        createdAt
        updatedAt
   __typename
    }
  }
`
export const SIGNUP_MUTATION = gql`
  mutation SignUp($req: UserInputSignUp!) {
    SignUp(req: $req)
  }
`;