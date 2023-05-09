import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductEntity } from './dto/product.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductInput } from './dto/product.input';

@Resolver()
export class ProductResolver {

    constructor(private productService: ProductService) {}

    @UseGuards(new AuthGuard())
    @Mutation(() => ProductEntity)
    CreateNewProduct(@Context('user') userId: number, @Args('req') req: ProductInput) {
        return this.productService.createNewProduct(userId, req)
    }
}
