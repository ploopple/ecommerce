

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

/*
{
    "id": 5,
    "name": "qdwe",
    "description": "fsdf sdfsd",
    "price": 42,
    "stocks": 12,
    "userId": 4,
    "image": "fsdfsdfsdf",
    "createdBy": "fasdf",
    "updatedAt": "2023-05-10T12:15:59.423Z",
    "createdAt": "2023-05-10T12:15:59.423Z",
    "__typename": "ProductEntity"
}
*/