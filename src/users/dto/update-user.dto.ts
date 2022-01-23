import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  username?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(10)
  about?: string;
}
