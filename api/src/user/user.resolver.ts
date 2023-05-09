import { UserService } from './user.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './dto/user.entity';
import { UserInput } from './dto/user.input';

@Resolver()
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => UserEntity)
    GetUserInfo(@Args("userId") userId: number) {
        return this.userService.getUserInfo(userId)
    }
    @Mutation(() => UserEntity)
    CreateNewUser(@Args("req") req: UserInput) {
        return this.userService.createNewUser(req)
    }
}
