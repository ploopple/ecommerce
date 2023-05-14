import { gql } from "@apollo/client"

export const GET_ALL_PRODUCTS = gql`
{
  GetAllProducts {
    id
    name
    description
    price
    stocks
    userId
    image
    createdBy
    updatedAt
    createdAt
   __typename
  }
}
`
export const LOGIN_QUERY= gql`
  query Login($req: UserInputLogin!) {
    Login(req: $req)
  }
`;

export const GET_PRODUCT_BY_ID = gql`
query GetProductById($id: Float!){
  GetProductById(productId: $id){
    id
    name
    description
    createdBy
    price
    stocks
    userId
    stocks
    image
    createdAt
    updatedAt
  }
}
`
export const GET_USER_INFO = gql`
 {
   GetUserInfo {
    id
    username
    email
    createdAt
    createdAt
    updatedAt
  }
}`