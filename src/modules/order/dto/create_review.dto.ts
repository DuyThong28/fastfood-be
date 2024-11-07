import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  star: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
