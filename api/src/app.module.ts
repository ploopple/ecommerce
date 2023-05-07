import { Module } from '@nestjs/common';

import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './schema.gql'),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
