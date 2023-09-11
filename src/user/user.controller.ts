import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Delete,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express'; // Import Request and Response
import { SigninUserDto } from './dto/signin-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signUp(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    const createUser = await this.userService.signup(createUserDto);
    return res.send(createUser);
  }

  @Post('signIn')
  signIn(@Body() signinUserDTO: SigninUserDto) {
    return this.userService.signin(signinUserDTO);
  }

  @Post('update/:id')
  updateUser(@Param('id') id: number, @Body() updateUserDTO: UpdateUserDto) {
    return this.userService.updateuser(updateUserDTO, id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteuser(id);
  }
}
