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
    UpdateProductById(@Context('user') userId: any, @Args('productId') productId: number, @Args("req") req: ProductInput) {
        return this.productService.updateProductById(productId, +userId.userId, req)
    }

    @UseGuards(new AuthGuard())
    @Mutation(() => String)
    DeleteProductById(@Context('user') userId: any, @Args('productId') productId: number) {
        return this.productService.deleteProductById(productId, +userId.userId)
    }
}
