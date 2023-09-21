import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../rest/user/user.service';
import { User } from '../rest/user/entities/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUser(@Args('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('name') name: string, @Args('email') email: string) {
    return this.userService.createUser();
  }
}
