import { IsNotEmpty } from 'class-validator';

export class CreateQuoteDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  quoteNumber: string;

  @IsNotEmpty()
  customerId: string;

  @IsNotEmpty()
  policyDetails: string;

  @IsNotEmpty()
  entityId: string;
}
