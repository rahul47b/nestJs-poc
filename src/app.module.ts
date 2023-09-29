import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from './rest/user/user.module';
import { DatabaseModule } from './dbConfiguration/database.module';
import { graphQLModule } from './graphql/graphql.module';

@Module({
  imports: [UserModule, DatabaseModule, forwardRef(() => graphQLModule)],
  controllers: [],
  providers: [],
})
export class AppModule {}
