import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInByEmailDto {
  @ApiProperty({
    description: 'email of user',
    example: 'lmtoan311@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password of user',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
