import { OrderStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/utils/page_option.dto';

export class OrderPageOptionsDto extends PageOptionsDto {
  @IsEnum(OrderStatus)
  @IsOptional()
  status: OrderStatus;
  @IsString()
  @IsOptional()
  search?: string;
}
