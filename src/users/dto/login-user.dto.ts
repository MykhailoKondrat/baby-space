import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from '../../decorators/match.decorator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Password must be longer then 5 characters' })
  password: string;
}

export class NewUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Password must be longer then 5 characters' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Password must be longer then 5 characters' })
  @Match('password', { message: 'passwords are not equal' })
  confirmPassword: string;
}
