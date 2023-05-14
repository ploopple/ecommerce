

export interface IUserData {
    id: number
    username: string
    email: string
    createdAt: Date
    updatedAt: Date
}

export interface IProductData {
    id: number
    name: string
    description: string
    price: number
    stocks: number
    userId: number
    image: string
    createdBy: string
    createdAt: Date
    updatedAt: Date
}
export interface IInputDataString {
   value: string , errMsg: string 
}
export interface IInputDataNumber {
  value: number , errMsg: string 
}
export interface IProductInputData {
  name: IInputDataString
  description: IInputDataString
  price: IInputDataNumber
  stocks: IInputDataNumber
  createdBy: IInputDataString
  image: IInputDataString
}
export interface ISignUpData {
  username: IInputDataString
  email: IInputDataString
  password: IInputDataString
}
export interface ILoginData {
  email: IInputDataString
  password: IInputDataString
}