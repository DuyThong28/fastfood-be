import { ReviewState } from '@prisma/client';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/utils/page_option.dto';

export class GetReviewsDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  search?: string;
  @IsArray()
  @IsOptional()
  rating?: number[];
  @IsString()
  @IsOptional()
  date?: string;
  @IsEnum(ReviewState)
  @IsOptional()
  state?: ReviewState;
}
