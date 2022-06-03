import { IPagination, Pagination } from './Pagination';
import { BasicFabric, FabricMixins, staticImplements } from './BasicFabric';

@staticImplements<FabricMixins<Pagination>>()
export class PaginationFabric extends BasicFabric<Pagination> {
  private static instance?: PaginationFabric;
  validateModel(model: unknown): model is Pagination {
    return (
      !!(
        (model as IPagination)?.per_page &&
        (model as IPagination)?.total_pages &&
        (model as IPagination)?.total &&
        (model as IPagination)?.page
      ) ||
      !!(
        (model as Pagination)?.totalPages &&
        (model as Pagination)?.currentPage &&
        (model as Pagination)?.currentItemsCount &&
        (model as Pagination)?.totalItemsCount &&
        (model as Pagination)?.perPageItemsCount &&
        (model as Pagination)?.isListEnd
      )
    );
  }

  generateModel(userData: IPagination): Pagination {
    return new Pagination(userData);
  }

  public static create(data: unknown): Pagination | void {
    if (!PaginationFabric.instance) {
      PaginationFabric.instance = new PaginationFabric();
    }

    return PaginationFabric.instance.generate(data) as Pagination | void;
  }

  public static check(data: unknown): data is Pagination {
    if (!PaginationFabric.instance) {
      PaginationFabric.instance = new PaginationFabric();
    }

    return PaginationFabric.instance.validate(data);
  }
}
