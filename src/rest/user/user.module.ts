import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserResolver } from 'src/graphql/user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'this',
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [
    JwtModule.register({
      secret: 'this',
      signOptions: { expiresIn: '1h' },
    }),
    UserService,
    UserResolver,
  ],
})
export class UserModule { }
