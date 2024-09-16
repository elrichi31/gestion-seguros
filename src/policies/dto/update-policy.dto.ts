import { PartialType } from '@nestjs/mapped-types';
import { CreatePolicyDto } from './create-policy.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePolicyDto extends PartialType(CreatePolicyDto) {
  @ApiPropertyOptional({ description: 'Número de póliza actualizado' })
  policyNumber?: string;

  @ApiPropertyOptional({ description: 'Detalles de la póliza actualizados' })
  details?: string;
}
