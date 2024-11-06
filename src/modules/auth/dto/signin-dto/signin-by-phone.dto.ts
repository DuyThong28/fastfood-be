import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInByPhoneDto {
  @ApiProperty({
    description: 'The phone number of the user',
    maxLength: 20,
    required: true,
    default: '0896423104',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

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
