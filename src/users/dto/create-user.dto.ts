import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe@example.com', description: 'Correo electrónico del usuario' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña del usuario' })
  @IsNotEmpty()
  @MinLength(6)  // Contraseña con al menos 6 caracteres
  password: string;

  @ApiProperty({ example: 'cliente', description: 'Rol del usuario (admin, broker, cliente)' })
  @IsNotEmpty()
  role: string;

  @ApiProperty({ example: 'entity001', description: 'ID de la entidad a la que pertenece el usuario' })
  @IsNotEmpty()
  entityId: string;
}
