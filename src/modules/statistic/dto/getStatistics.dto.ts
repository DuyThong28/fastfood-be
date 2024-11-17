import { IsString } from 'class-validator';
import { PageOptionsDto } from 'src/utils/page_option.dto';

export class StatisticPageOptionsDto extends PageOptionsDto {
  @IsString()
  readonly sortBy1?: string = 'day';
  @IsString()
  readonly sortBy2?: string = 'month';
  @IsString()
  readonly sortBy3?: string = 'year';
}
