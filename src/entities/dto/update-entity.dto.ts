import { PartialType } from '@nestjs/mapped-types';
import { CreateEntityDto } from './create-entity.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEntityDto extends PartialType(CreateEntityDto) {
  @ApiPropertyOptional({ description: 'Nombre actualizado de la entidad' })
  name?: string;

  @ApiPropertyOptional({ description: 'Dirección actualizada de la entidad' })
  address?: string;

  @ApiPropertyOptional({ description: 'Correo de contacto actualizado' })
  contactEmail?: string;
}
