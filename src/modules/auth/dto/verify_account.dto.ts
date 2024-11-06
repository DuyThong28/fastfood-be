import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerificationEmailDto {
  @ApiProperty({
    description: 'The email address of the user',
    required: true,
  })
  @IsString()
  token: string;
}
