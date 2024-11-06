import { PaginationOptions } from './pagination_options';

export interface PageMetaDtoParameters {
  pageOptions: PaginationOptions;
  totalItems: number;
}

export class MetaPaginationOptionsResponse extends PaginationOptions {
  public readonly totalItems: number;
  public readonly totalPages: number;
  public readonly hasPreviousPage: boolean;
  public readonly hasNextPage: boolean;

  constructor({ pageOptions, totalItems }: PageMetaDtoParameters) {
    super();
    this.page = pageOptions.page;
    this.take = pageOptions.take;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(this.totalItems / this.take) ?? 0;
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.totalPages;
  }
}
