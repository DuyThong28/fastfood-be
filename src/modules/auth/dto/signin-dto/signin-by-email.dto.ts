import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInByEmailDto {
  @ApiProperty({
    description: 'The email of the user',
    maxLength: 50,
    required: true,
    default: 'customer@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    description: 'The password of the user',
    minLength: 8,
    maxLength: 100,
    required: true,
    default: 'customer123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
