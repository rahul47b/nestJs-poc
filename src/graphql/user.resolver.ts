import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UserService } from '../rest/user/user.service';
import { User } from '../rest/user/entities/user.entity';
import { CreateUserDto } from 'src/rest/user/dto/create-user.dto';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => User)
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

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserDto) {
    const newUser = await this.userService.createUser(input);
    await pubSub.publish('userCreated', { userCreated: newUser });
    return newUser;
  }

  @Subscription(() => User)
  async userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
