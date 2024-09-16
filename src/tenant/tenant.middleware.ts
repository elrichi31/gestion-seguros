import { Injectable, NestMiddleware, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = this.jwtService.verify(token);

      if (!decodedToken || !decodedToken.entityId) {
        throw new ForbiddenException('Entidad no identificada');
      }
      req.body.entityId = decodedToken.entityId;
      
      next();
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
