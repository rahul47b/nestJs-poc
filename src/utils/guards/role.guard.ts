import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const authorizationHeader = request.headers['authorization'];
    const token = authorizationHeader.replace('Bearer ', '');
    const decodedUser = this.jwtService.verify(token, {
      secret: 'this',
    });
    if (
      !decodedUser ||
      !decodedUser.userResult.roles ||
      !Array.isArray(decodedUser.userResult.roles)
    ) {
      throw new UnauthorizedException('Your Role is not authorized');
    }
    const userRoles = decodedUser.userResult.roles;
    const isAuthorized = requiredRoles.some((role) => userRoles.includes(role));
    if (!isAuthorized) {
      throw new UnauthorizedException('Your Role is not authorized');
    }
    return true;
  }
}
