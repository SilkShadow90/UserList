export function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

export interface FabricMixins<P> {
  create(data: unknown): P | P[] | void;
  checkModel(data: unknown): boolean;
  checkInterface(data: unknown): boolean;
}

export abstract class BasicFabric<T extends {}, P extends {}> {
  protected abstract validateInterface(object: unknown): object is P;
  protected abstract validateModel(model: unknown): model is T;
  protected abstract generateModel(model: unknown): T;

  protected initialValidate(model: unknown): model is P | P[] {
    if (Array.isArray(model)) {
      if (!model.length) {
        return true;
      }

      return this.validateInterfaces(model);
    }

    return this.validateInterface(model);
  }

  protected endValidate(model: unknown): model is P | P[] {
    if (Array.isArray(model)) {
      if (!model.length) {
        return true;
      }

      return this.validateModels(model);
    }

    return this.validateModel(model);
  }

  private validateModels(models: unknown[]): models is T[] {
    return models.every(model => this.validateModel(model));
  }

  private validateInterfaces(models: unknown[]): models is P[] {
    return models.every(model => this.validateInterface(model));
  }

  protected generate(models: unknown): T | T[] | void {
    if (this.initialValidate(models)) {
      if (Array.isArray(models)) {
        return models.map(model => this.generateModel(model));
      }

      return this.generateModel(models);
    }
  }
}
