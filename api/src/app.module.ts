import { Module } from '@nestjs/common';

import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './schema.gql'),
      context: ({req}) => ({headers: req.headers})
    }),
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    PrismaClient,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
