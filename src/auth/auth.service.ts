import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Registro de usuarios con hash de contraseña
  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.usersService.create({
      ...createUserDto,
      password: hashedPassword,  // Almacenar la contraseña como hash
    });
  }

  // Iniciar sesión y generar token JWT si las credenciales son correctas
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.usersService.findByEmail(email);

    // Comparar la contraseña del usuario con el hash almacenado
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, id: user.id, entityId: user.entityId, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),  // Generar y devolver el token JWT
      };
    } else {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }
}
