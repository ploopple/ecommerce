

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
export interface IInputData {
  [key: string]: { value: string | number, errMsg: string }
}

