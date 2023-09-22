import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsEmail,
  IsArray,
} from 'class-validator';
import { Field, ID, InputType } from '@nestjs/graphql'; // this is for graphql only

@InputType()
export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @Field(() => ID)
  username: string;

  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  password: string;

  @IsArray()
  @Field(() => [String], { nullable: true })
  roles: string[];

  @IsArray()
  @Field(() => [String], { nullable: true })
  permissions: string[];
}
