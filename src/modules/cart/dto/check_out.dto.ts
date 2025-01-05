import { PaymentMethod } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CheckOutDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsString()
  @IsNotEmpty()
  shippingAddress: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;
}
