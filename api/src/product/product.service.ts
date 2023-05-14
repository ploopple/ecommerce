import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { ProductInput } from './dto/product.input';

@Injectable()
export class ProductService {

    constructor(private prisma: PrismaClient) {}

    async createNewProduct(userId: number, req: ProductInput) {
        try {
            userId = +userId
            return await this.prisma.product.create({
                data:{
                    name: req.name,
                    createdBy: req.createdBy,
                    image: req.image,
                    description: req.description,
                    userId,
                    price: req.price,
                    stocks: req.stocks
                }
            })
        } catch (err) {
            return err
        }
}

    async getProductById(productId: number) {
        try{
            return await this.prisma.product.findFirstOrThrow({where: {id: productId}})
        }catch(err) {
            throw err
        }
    }

    async getAllProducts() {
        try{
            return await this.prisma.product.findMany()
        }catch(err) {
            throw err
        }
    }


    async updateProductById(productId: number, userId: number, req: ProductInput) {
        try{
            const product = await this.prisma.product.findFirstOrThrow({where: {id: productId}})
            if(product.userId !== userId) {
                throw new ForbiddenException("product does not belong to you")
            }
            return await this.prisma.product.update({
                where: {id: productId},
                data: {
                    name: req.name,
                    description: req.description,
                    createdBy: req.createdBy,
                    price: req.price,
                    stocks: req.stocks,
                    image: req.image
                }
            })

        }catch(err) {
            throw err
        }
    }

    async deleteProductById(productId: number, userId: number) {
        try{
            const product = await this.prisma.product.findFirstOrThrow({where: {id: productId}})
            if(product.userId !== userId) {
                throw new ForbiddenException("product does not belong to you")
            }

            await this.prisma.product.delete({where: {id: product.id}})
            return "Done"
        }catch(err) {
            throw err
        }
    }
}
