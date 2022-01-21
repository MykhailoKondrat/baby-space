import { IsOptional, IsString, MinLength } from 'class-validator';

export class FindOneDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  username: string;
}
