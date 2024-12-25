import { IsNotEmpty } from 'class-validator';

export class createStatisticDto {
  @IsNotEmpty()
  day: number;
  @IsNotEmpty()
  month: number;
  @IsNotEmpty()
  year: number;
}
