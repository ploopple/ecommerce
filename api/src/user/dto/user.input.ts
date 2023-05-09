import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UserInput {
    @Field()
    @IsNotEmpty()
    email: string

    @Field()
    @IsNotEmpty()
    username: string

    @Field()
    @IsNotEmpty()
    password: string
}