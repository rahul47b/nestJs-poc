import { IsString, MinLength, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
