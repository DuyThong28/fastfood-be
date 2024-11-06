import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class ResetPasswordDto {
  @ApiProperty({
    description: "User's email",
    example: 'lmtoan311@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    description: "User's new password",
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
  @ApiProperty({
    description: "User's code to reset password",
    example: '123456',
    required: true,
  })
  @IsString()
  code: string;
}
export default ResetPasswordDto;
