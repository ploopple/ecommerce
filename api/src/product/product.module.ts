import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [ProductService, ProductResolver, PrismaClient]
})
export class ProductModule {}
