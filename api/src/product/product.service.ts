import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { ProductInput } from './dto/product.input';
import { ProductEntity } from './dto/product.entity';
import { UserEntity } from 'src/user/dto/user.entity';

@Injectable()
export class ProductService {

    constructor(private prisma: PrismaClient) {}

    async createNewProduct(userId: number, req: ProductInput) {
        try {
            userId = +userId
            // const user: User = await this.prisma.user.findFirst({where: {id: userId}})
            return await this.prisma.product.create({
                data:{
                    name: req.name,
                    createdBy: req.createdBy,
                    image: req.image,
                    description: req.description,
                    // user,
                    userId,
                    price: req.price,
                    stocks: req.stocks
                }
            })
        } catch (err) {
            return err
        }
    }
}
