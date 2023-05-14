import { Module } from '@nestjs/common';

import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { PrismaClient } from '@prisma/client';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './schema.gql'),
      context: ({req}) => ({headers: req.headers}),
    }),
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    PrismaClient,
    ProductModule,
    PrismaModule,
    // AuthModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
