import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions) {
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
      throw new UnauthorizedException('You Dont have enough permission');
    }
    const userPermissions = decodedUser.userResult.permissions;
    const reqPermissions = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
    if (!reqPermissions) {
      throw new UnauthorizedException('You Dont have enough permission');
    }
    return true;
  }
}
