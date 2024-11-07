import { ApiProperty } from '@nestjs/swagger';
import { Gender, Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of a user',
    type: String,
    required: true,
    example: 'lmtoan311@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @MinLength(8)
  @IsNotEmpty()
  password: string;
  @IsString()
  fullName: string;
  @IsEnum(Role)
  role: Role;
  @IsString()
  @IsOptional()
  phone: string;
  @IsEnum(Gender)
  gender: Gender;
  @IsNotEmpty()
  birthday: Date;
}
