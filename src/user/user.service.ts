import {
  Injectable,
  HttpStatus,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable({})
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async signin(signinUserDto: SigninUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: signinUserDto.email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(
      signinUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      userDetail: user.email,
      message: 'User Signed In Successfully',
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);
    return {
      message: 'User Signed Up Successfully',
      status: HttpStatus.CREATED,
      data: newUser,
    };
  }

  async updateuser(updateUserDTO: UpdateUserDto, id: number) {
    const user = await this.userRepository.findOne({
      where: { email: updateUserDTO.email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update(
      { id },
      { username: updateUserDTO.username },
    );
    return {
      message: 'user update successfully',
      status: HttpStatus.OK,
    };
  }

  async deleteuser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
    return {
      message: 'User deleted successfully',
      status: HttpStatus.OK,
    };
  }
}
