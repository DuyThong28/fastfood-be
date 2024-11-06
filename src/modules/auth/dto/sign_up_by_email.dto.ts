import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GENDER } from 'src/utils/constants';

export class SignUpByEmail {
  @ApiProperty({
    description: 'email of user',
    example: 'lmtoan311@gmail.com',
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'password of user',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'full name of user',
    example: 'Toan Le Minh',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(GENDER)
  @IsNotEmpty()
  gender: GENDER;

  @IsString()
  @IsNotEmpty()
  birthDate: string;
}
