import { IsEnum, IsOptional } from 'class-validator';
import { ORDER } from 'src/constants/enum';

export class PaginationResponse {
  @IsEnum(ORDER)
  @IsOptional()
  order?: ORDER = ORDER.DESC;
}
