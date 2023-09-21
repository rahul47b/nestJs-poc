import { Module } from '@nestjs/common';
import { graphQLModule } from './graphql/graphql.module';
import { UserModule } from './rest/user/user.module';
import { DatabaseModule } from './dbConfiguration/database.module';

@Module({
  imports: [UserModule, DatabaseModule, graphQLModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
