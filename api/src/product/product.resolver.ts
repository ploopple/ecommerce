import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
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
    CreateNewProduct(@Context('user') userId: any, @Args('req') req: ProductInput) {
        console.log(userId)
        return this.productService.createNewProduct(+userId.userId, req)
    }

    @Query(() => ProductEntity)
    GetProductById(@Args("productId") productId: number) {
        return this.productService.getProductById(productId)
    }

    @Query(() => [ProductEntity])
    GetAllProducts() {
        return this.productService.getAllProducts()
    }

    @UseGuards(new AuthGuard())
    @Mutation(() => ProductEntity)
    UpdateProductById(@Context('user') userId: number, @Args('productId') productId: number) {
        return this.productService.updateProductById(productId, +userId)
    }

    @UseGuards(new AuthGuard())
    @Mutation(() => String)
    DeleteProductById(@Context('user') userId: number, @Args('productId') productId: number) {
        return this.productService.deleteProductById(productId, +userId)
    }
}
