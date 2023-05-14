import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "@prisma/client";
import { ProductEntity } from "src/product/dto/product.entity";

@ObjectType()
export class UserEntity {
    @Field()
    id: number

    @Field()
    email: string

    @Field()
    username: string

    @Field()
    hashPassword: string

    @Field()
    createdAt: Date 

    @Field()
    updatedAt: Date 
}