import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageResponseMetaDto } from './page_response_meta.dto';

export class PageResponseDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PageResponseMetaDto })
  readonly meta: PageResponseMetaDto;

  constructor(data: T[], meta: PageResponseMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
