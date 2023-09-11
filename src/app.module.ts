import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database.module';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [UserModule, DatabaseModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
