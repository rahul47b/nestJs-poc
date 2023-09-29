import { Module, forwardRef } from '@nestjs/common';
import { GraphQLModule, SubscriptionConfig } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserResolver } from './user.resolver';
import { UserModule } from 'src/rest/user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
      playground: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      } as SubscriptionConfig,
    }),
    forwardRef(() => UserModule),
  ],
  providers: [UserResolver],
})
export class graphQLModule {}
