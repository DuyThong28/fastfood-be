import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class SignUpByEmailDto {
  @ApiProperty({
    description: 'The email of the user',
    type: String,
    required: true,
    maxLength: 100,
    default: 'lmtoan311@gmail.com',
  })
  @IsEmail()
  email: string;

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
  @IsEnum(Gender)
  gender: Gender;
  @IsNotEmpty()
  birthday: Date;
}
