import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UserResolver {

    @Query(() => String)
    GetAllUsers() {
        return "hi"
    }
}
