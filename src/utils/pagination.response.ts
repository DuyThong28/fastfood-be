import { MetaPaginationOptionsResponse } from './pagination_option.response';

export class PageResponseObject<T> {
  public readonly message: string;
  public readonly result: {
    data: T[];
    meta_data: MetaPaginationOptionsResponse;
  };
  private constructor(
    message: string,
    data: T[],
    meta_data: MetaPaginationOptionsResponse,
  ) {
    this.message = message;
    this.result = {
      data,
      meta_data,
    };
  }
  public static create<T>(
    message: string = 'Success',
    data: T[],
    meta_data: MetaPaginationOptionsResponse,
  ) {
    return new PageResponseObject(message, data, meta_data);
  }
}
