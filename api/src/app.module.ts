import { Module } from '@nestjs/common';

import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { PrismaClient } from '@prisma/client';


@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './schema.gql'),
    }),
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    PrismaClient
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
