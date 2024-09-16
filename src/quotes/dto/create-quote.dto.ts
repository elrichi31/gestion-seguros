import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuoteDto {
  @ApiProperty({ example: 'quote001', description: 'ID único de la cotización' })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'QT1001', description: 'Número de cotización' })
  @IsNotEmpty()
  quoteNumber: string;

  @ApiProperty({ example: 'customer001', description: 'ID del cliente asociado a la cotización' })
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({ example: 'Detalles de la póliza...', description: 'Detalles de la póliza propuesta' })
  @IsNotEmpty()
  policyDetails: string;

  @ApiProperty({ example: 'entity001', description: 'ID de la entidad asociada a la cotización' })
  @IsNotEmpty()
  entityId: string;
}
