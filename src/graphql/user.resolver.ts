import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UserService } from '../rest/user/user.service';
import { User } from '../rest/user/entities/user.entity';
import { CreateUserDto } from 'src/rest/user/dto/create-user.dto';
@Resolver(() => User)
// @UseInterceptors(LoggingInterceptor)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUser(@Args('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Query(() => [User])
  async getAllUsers() {
    return this.userService.allUsers();
  }

  @Subscription(() => User)
  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserDto) {
    return this.userService.createUser(input);
  }
}
