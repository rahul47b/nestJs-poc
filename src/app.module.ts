import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database.module';
import { join } from 'path';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// definitions: {
//   path: join(process.cwd(), 'src/graphql.schama.ts'),
//   outputAs: 'class'
// }
