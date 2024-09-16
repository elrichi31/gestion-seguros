import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePolicyDto {
  @ApiProperty({ example: 'policy001', description: 'ID único de la póliza' })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'PL1001', description: 'Número de póliza' })
  @IsNotEmpty()
  policyNumber: string;

  @ApiProperty({ example: 'customer001', description: 'ID del cliente asociado a la póliza' })
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({ example: 'Cobertura total...', description: 'Detalles de la póliza' })
  @IsNotEmpty()
  details: string;

  @ApiProperty({ example: 'entity001', description: 'ID de la entidad asociada a la póliza' })
  @IsNotEmpty()
  entityId: string;
}
