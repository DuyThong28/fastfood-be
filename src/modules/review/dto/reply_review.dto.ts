import { IsString } from 'class-validator';

export class AdminReplyReviewDto {
  @IsString()
  reply: string;
}
