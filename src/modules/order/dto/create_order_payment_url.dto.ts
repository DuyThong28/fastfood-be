import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentUrlDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;
}
