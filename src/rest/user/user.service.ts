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
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signin(signinUserDto: SigninUserDto) {
    const userResult = await this.userRepository.findOne({
      where: { email: signinUserDto.email },
    });
    if (!userResult) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(
      signinUserDto.password,
      userResult.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { userResult };
    const accessToken = this.jwtService.sign(payload, {
      secret: 'this',
      algorithm: 'HS256',
    });

    const signInResponse = { accessToken };

    return signInResponse;
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

  async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(input: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: input.email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(input.password, saltRounds);
    const newUser = this.userRepository.create({
      ...input,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async allUsers() {
    return await this.userRepository.find();
  }
}
