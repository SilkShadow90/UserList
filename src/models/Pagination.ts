export interface IPagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export class Pagination {
  currentPage: number;
  totalPages: number;
  totalItemsCount: number;
  perPageItemsCount: number;
  currentItemsCount: number;
  isListEnd: boolean;

  public constructor(model: IPagination) {
    this.currentPage = model.page;
    this.totalPages = model.total_pages;
    this.perPageItemsCount = model.per_page;
    this.totalItemsCount = model.total;
    this.currentItemsCount = model.per_page * model.page;
    this.isListEnd = model.page === model.total_pages;
  }
}
