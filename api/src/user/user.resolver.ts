import { UserService } from './user.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './dto/user.entity';
import { UserInput } from './dto/user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Resolver()
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => UserEntity)
    GetUserInfo(@Args("userId") userId: number) {
        return this.userService.getUserInfo(userId)
    }
    @Mutation(() => String)
    CreateNewUser(@Args("req") req: UserInput) {
        return this.userService.createNewUser(req)
    }

    @UseGuards(new AuthGuard())
    @Query(() => String)
    GetSomthing() {
        return "secret"
    }
}
