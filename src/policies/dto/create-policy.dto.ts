import { IsNotEmpty } from 'class-validator';

export class CreatePolicyDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  policyNumber: string;

  @IsNotEmpty()
  customerId: string;

  @IsNotEmpty()
  details: string;

  @IsNotEmpty()
  entityId: string;
}
