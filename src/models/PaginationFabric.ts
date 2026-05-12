import { IPagination, Pagination } from './Pagination';
import { BasicFabric } from './BasicFabric';
import { isObject } from '../utils';

export class PaginationFabric extends BasicFabric<Pagination, IPagination> {
  private static readonly instance = new PaginationFabric();

  protected validateInterface(model: unknown): model is IPagination {
    return (
      isObject(model) &&
      'per_page' in model &&
      'total_pages' in model &&
      'total' in model &&
      'page' in model
    );
  }

  protected validateModel(model: unknown): model is Pagination {
    return (
      isObject(model) &&
      'currentPage' in model &&
      'totalPages' in model &&
      'perPageItemsCount' in model &&
      'totalItemsCount' in model &&
      'isListEnd' in model
    );
  }

  protected generateModel(data: IPagination): Pagination {
    return new Pagination(data);
  }

  static create(data: unknown): Pagination | undefined {
    const result = PaginationFabric.instance.create(data);
    return Array.isArray(result) ? undefined : result;
  }

  static checkInterface(data: unknown): data is IPagination {
    return !Array.isArray(data) && PaginationFabric.instance.checkInterface(data);
  }

  static checkModel(data: unknown): data is Pagination {
    return !Array.isArray(data) && PaginationFabric.instance.checkModel(data);
  }
}
