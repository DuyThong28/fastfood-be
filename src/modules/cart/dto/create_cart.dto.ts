import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({
    description: 'User ID',
    required: true,
  })
  @IsString()
  user_id: string;
}
