import { IsString } from 'class-validator';

export class SearchProductDto {
  @IsString()
  title?: string;
  @IsString()
  author?: string;
  @IsString()
  category?: string;
  @IsString()
  status?: string;
}
