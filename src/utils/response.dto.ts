import { ApiProperty } from '@nestjs/swagger';

export class StandardResponse<T> {
  @ApiProperty({ example: true })
  success: boolean;
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Data retrieved successfully' })
  message: string;
  @ApiProperty({ description: 'The response data' })
  data: T;
  constructor(data: T, message: string, statusCode: number) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
