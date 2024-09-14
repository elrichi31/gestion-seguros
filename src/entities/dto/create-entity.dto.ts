import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEntityDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsEmail()
  contactEmail: string;
}
