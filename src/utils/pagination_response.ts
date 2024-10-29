import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { MAX_ITEMS_PER_PAGE } from 'src/constants/constraints';
import { ORDER } from 'src/constants/enum';

export class PaginationResponse {
  @IsEnum(ORDER)
  @IsOptional()
  order?: ORDER = ORDER.DESC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MAX_ITEMS_PER_PAGE)
  @IsOptional()
  take?: number;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @IsString()
  @IsOptional()
  sortBy?: string = 'createdAt';
}
