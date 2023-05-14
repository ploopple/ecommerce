import { ProductEntity } from 'src/product/dto/product.entity';
import { IsNotEmpty } from 'class-validator';
import { Test, TestingModule } from '@nestjs/testing';
// import { PrismaService } from '../prisma.service';
// import { UserService } from './user.service';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
// import { UserInputSignUp } from './dto/user.input.signUp';
// import { UserInputLogin } from './dto/user.input.login';
import { ProductService } from './product.service';
import { ProductInput } from './dto/product.input';

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService],
    }).compile();

    productService = module.get<ProductService>(ProductService);
  });

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_TEST_URL,
      },
    },
  });

  it('should create a new product', async () => {
    const userId = 1;
    const productInput: ProductInput = {
      name: 'Test Product',
      createdBy: 'Test User',
      image: 'test-image.png',
      description: 'Test product description',
      price: 100,
      stocks: 10,
    };

    const result = await productService.createNewProduct(userId, productInput);
    expect(result).toEqual({
      id: result.id,
      ...productInput,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      userId,
    });
  });

  it('should get product by id', async () => {
    const result = await productService.getProductById(1)
    expect(result).toBeDefined
  })

  it('should not get product by id and throw error', async () => {
    const result = await productService.getProductById(-1)
    expect(result).rejects.toThrowError
  })

  it('should get a list of products', async () => {
    const result = await productService.getAllProducts()
    expect(result).not.toHaveLength(0)
  })

  // it('should delete product by id', async () => {
  //   const result = await productService.deleteProductById(3,1)
  //   expect(result).toEqual("Done")
  // })

  it('should not delete product by id', async () => {
    const result = await productService.deleteProductById(1,5)
    expect(result).rejects.toThrowError
  })

  it('should update product by id', async () => {
    const userId = 1 
    const productId = 4
    const req: ProductInput = {
      name: "update name",
      description: "update description",
      createdBy: "new owner",
      price: 34,
      stocks: 534,
      image: "httss"
    }
    const result: any = await productService.updateProductById(productId,userId, req)
    expect(result).toEqual({
      ...req,
      id: productId,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      userId
    })
  })

  it('should not update product by id', async () => {
    const userId = 1 
    const productId = 1 
    const req: ProductInput = {
      name: "update name",
      description: "update description",
      createdBy: "new owner",
      price: 34,
      stocks: 534,
      image: "httss"
    }
    const result: any = await productService.updateProductById(productId,userId, req)
    expect(result).rejects.toThrowError
  })

});
