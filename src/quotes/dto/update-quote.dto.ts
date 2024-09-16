import { PartialType } from '@nestjs/mapped-types';
import { CreateQuoteDto } from './create-quote.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateQuoteDto extends PartialType(CreateQuoteDto) {
  @ApiPropertyOptional({ description: 'Número de cotización actualizado' })
  quoteNumber?: string;

  @ApiPropertyOptional({ description: 'Detalles de la póliza actualizados' })
  policyDetails?: string;
}
