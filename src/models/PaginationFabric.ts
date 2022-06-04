import { IPagination, Pagination } from './Pagination';
import { BasicFabric, FabricMixins, staticImplements } from './BasicFabric';

@staticImplements<FabricMixins<Pagination>>()
export class PaginationFabric extends BasicFabric<Pagination, IPagination> {
  private static instance?: PaginationFabric;
  validateModel(model: object): model is Pagination {
    return Object.keys(Pagination.prototype).every(property => model.hasOwnProperty(property));
  }

  validateInterface(model: object): model is IPagination {
    return (
      model.hasOwnProperty('per_page') &&
      model.hasOwnProperty('total_pages') &&
      model.hasOwnProperty('total') &&
      model.hasOwnProperty('page')
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

  public static checkInterface(data: unknown): data is IPagination {
    if (!PaginationFabric.instance) {
      PaginationFabric.instance = new PaginationFabric();
    }

    return PaginationFabric.instance.initialValidate(data);
  }

  public static checkModel(data: unknown): data is Pagination {
    if (!PaginationFabric.instance) {
      PaginationFabric.instance = new PaginationFabric();
    }

    return PaginationFabric.instance.endValidate(data);
  }
}
