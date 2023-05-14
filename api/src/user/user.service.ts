import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

import * as bcrypt from 'bcrypt';
import { UserInputSignUp } from './dto/user.input.signUp';
import { UserInputLogin } from './dto/user.input.login';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }

    private createJWTToken(userId: string): string {
        const token = jwt.sign({ userId }, process.env.SECRETKEY, {  expiresIn: '1h' });
        return token;

    }

    async signUp(req: UserInputSignUp): Promise<string> {
        try {
            const hashPassword = bcrypt.hashSync(req.password, 10)
            const user = await this.prisma.user.create({
                data: {
                    email: req.email,
                    username: req.username,
                    hashPassword: hashPassword,
                }
            })
            return this.createJWTToken(user.id + "")
        } catch (err) {
            return err
        }
    }
    async login(req: UserInputLogin): Promise<string | Error> {
        try {
            const user = await this.prisma.user.findFirstOrThrow({ where: { email: req.email } })
            if (!user) {

                return new ForbiddenException("email or password are incorrect")
            }
            const pass = bcrypt.compareSync(req.password, user.hashPassword)
            if (!pass) {
                return new ForbiddenException("email or password are incorrect")
            }
            return this.createJWTToken(user.id + "")
        } catch (err) {
            throw err
        }
    }
    async getUserInfo(userId: number) {
        try {

            return await this.prisma.user.findFirstOrThrow({ where: { id: userId } })
        } catch (err) {
            return err
        }
    }
}
