import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class ProductInput {
    @Field()
    name: string

    @Field()
    description: string

    @Field()
    createdBy: string

    @Field()
    price: number 

    @Field()
    stocks: number
    
    @Field()
    image: string
}