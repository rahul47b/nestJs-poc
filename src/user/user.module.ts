import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserResolver } from './graphql/user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'this',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [
    JwtModule.register({
      secret: 'this',
      signOptions: { expiresIn: '1h' },
    }),
    UserService,
  ],
})
export class UserModule {}
