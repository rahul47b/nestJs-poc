import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('signup')
  signUp() {
    return this.authservice.signup();
  }

  @Post('signIn')
  signIn() {
    return this.authservice.signin();
  }
}
