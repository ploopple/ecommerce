import { Field, ObjectType } from "@nestjs/graphql";

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