import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { UserEntity } from "src/user/dto/user.entity";

@ObjectType()
export class ProductEntity {
    @Field()
    id: number

    @Field()
    name: string

    @Field()
    description: string

    @Field()
    price: number 

    @Field()
    stocks: number
    
    @Field()
    userId: number 
    
    // @Field()
    // user: User

    @Field()
    image: string

    @Field()
    createdBy: string

    @Field()
    createdAt: Date 

    @Field()
    updatedAt: Date 
}