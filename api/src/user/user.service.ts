import { Injectable } from '@nestjs/common';
import { UserInput } from './dto/user.input';
import { UserEntity } from './dto/user.entity';
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class UserService {

    constructor(private prisma: PrismaClient) {}

    private createJWTToken(userId: string): string {
        return jwt.sign(userId, process.env.SECRETKEY);
    }

    async createNewUser(req: UserInput): Promise<string> {
        try {
            const user =  await this.prisma.user.create({
                data: {
                    email: req.email, 
                    username: req.username, 
                    hashPassword: req.password
                }}) 
                console.log(user.id)
                return this.createJWTToken(user.id+"")
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
