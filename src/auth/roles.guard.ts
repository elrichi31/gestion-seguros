import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../common/decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado o formato incorrecto');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = this.jwtService.verify(token);
      const userRole = decodedToken.role;

      if (!userRole) {
        throw new ForbiddenException('El token no contiene un rol válido');
      }

      return requiredRoles.some((role) => userRole === role);

    } catch (error) {
      throw new ForbiddenException('Token inválido o expirado');
    }
  }
}
