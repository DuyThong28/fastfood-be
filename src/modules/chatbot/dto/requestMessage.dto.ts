import { IsNotEmpty } from 'class-validator';

export class requestMessageDto {
  @IsNotEmpty()
  message: string;
}
