import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { SigninUserDto } from './dto/signin-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/utils/customDecorators/roles.decorater';
import { Permissions } from 'src/utils/customDecorators/permission.decorater';
import { RolesGuard } from 'src/utils/guards/role.guard';
import { PermissionsGuard } from 'src/utils/guards/permission-guard';
import { Role } from 'src/utils/enums/role.enum';
import { Permission } from 'src/utils/enums/permission-action.enum';

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
  @UseGuards(RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN)
  @Permissions(Permission.UPDATE)
  updateUser(@Param('id') id: number, @Body() updateUserDTO: UpdateUserDto) {
    return this.userService.updateuser(updateUserDTO, id);
  }

  @Delete(':id')
  @UseGuards(RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN)
  @Permissions(Permission.DELETE)
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteuser(id);
  }
}
