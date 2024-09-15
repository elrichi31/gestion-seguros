import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber('EC')
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  entityId: string;
}
