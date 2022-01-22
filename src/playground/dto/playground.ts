import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlaygroundItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  testField: string;
}
