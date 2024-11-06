import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

class SendCodeDto {
  @ApiProperty({
    description: "User's email address",
    example: 'lmtoan311@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
export default SendCodeDto;
