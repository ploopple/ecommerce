import { Injectable } from '@nestjs/common';
import { UserInput } from './dto/user.input';
import { UserEntity } from './dto/user.entity';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaClient, private jwtService: JwtService) {}

    async createNewUser(req: UserInput): Promise<UserEntity> {
        try {
            return await this.prisma.user.create({
                data: {
                    email: req.email, 
                    username: req.username, 
                    hashPassword: req.password
                }}) 
        } catch (err) {
            return err 
        }
    }

    async getUserInfo(userId: number) {
        try {

        return await this.prisma.user.findFirstOrThrow({where: {id: userId}})
        } catch(err) {
            return err
        }
    }
}
