export function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

export interface FabricMixins<P> {
  create(data: unknown): P | P[] | void;
  check(data: unknown): boolean;
}

export abstract class BasicFabric<T extends {}> {
  protected abstract validateModel(model: unknown): model is T;
  protected abstract generateModel(model: unknown): T;

  protected validate(model: unknown): model is T | T[] {
    if (Array.isArray(model)) {
      return this.validateModels(model);
    }

    return this.validateModel(model);
  }

  private validateModels(models: unknown[]): models is T[] {
    return models.every(user => this.validateModel(user));
  }

  protected generate(models: unknown): T | T[] | void {
    if (this.validate(models)) {
      if (Array.isArray(models)) {
        return models.map(model => this.generateModel(model));
      }

      return this.generateModel(models);
    }
  }
}
