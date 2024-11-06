import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpByPhoneDto {
  @ApiProperty({
    description: 'The phone number of the user',
    type: String,
    required: true,
    maxLength: 100,
    default: '0896423104',
  })
  @IsEmail()
  phone: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
    required: true,
    maxLength: 100,
    default: '123456',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The full name of the user',
    type: String,
    required: true,
    default: 'Toan Le',
  })
  @IsNotEmpty()
  fullName: string;
}
