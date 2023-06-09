import { UserService } from './user.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './dto/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserInputSignUp } from './dto/user.input.signUp';
import { UserInputLogin } from './dto/user.input.login';

@Resolver()
export class UserResolver {
    constructor(private userService: UserService) {}

    @UseGuards(new AuthGuard())
    @Query(() => UserEntity)
    GetUserInfo(@Context('user') user: any) {
        return this.userService.getUserInfo(+user.userId)
    }

    @Query(() => String)
    Login(@Args('req') req: UserInputLogin) {
        return this.userService.login(req)
    }

    @Mutation(() => String)
    SignUp(@Args("req") req: UserInputSignUp) {
        return this.userService.signUp(req)
    }

}
