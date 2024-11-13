import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class AddToCartDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(1)
  quantity: number;
}
