import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEntityDto {
  @ApiProperty({ example: 'entity001', description: 'ID único de la entidad' })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Entidad Seguros SA', description: 'Nombre de la entidad' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123 Calle Falsa, Ciudad', description: 'Dirección de la entidad' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'contacto@seguros.com', description: 'Correo de contacto de la entidad' })
  @IsEmail()
  @IsNotEmpty()
  contactEmail: string;
}
