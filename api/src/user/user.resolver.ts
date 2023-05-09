import { UserService } from './user.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './dto/user.entity';
import { UserInput } from './dto/user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver()
export class UserResolver {
    constructor(private userService: UserService) {}

    @UseGuards(new AuthGuard())
    @Query(() => UserEntity)
    GetUserInfo(@Context('user') userId: number) {
        return this.userService.getUserInfo(+userId)
    }

    @Mutation(() => String)
    CreateNewUser(@Args("req") req: UserInput) {
        return this.userService.createNewUser(req)
    }
}
