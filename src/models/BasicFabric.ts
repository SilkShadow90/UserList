export abstract class BasicFabric<T, P> {
  protected abstract validateInterface(object: unknown): object is P;
  protected abstract validateModel(model: unknown): model is T;
  protected abstract generateModel(model: P): T;

  protected checkInterface(data: unknown): data is P | P[] {
    if (Array.isArray(data)) {
      return data.every(item => this.validateInterface(item));
    }
    return this.validateInterface(data);
  }

  protected checkModel(data: unknown): data is T | T[] {
    if (Array.isArray(data)) {
      return data.every(item => this.validateModel(item));
    }
    return this.validateModel(data);
  }

  protected create(data: unknown): T | T[] | undefined {
    if (Array.isArray(data)) {
      if (!data.every(item => this.validateInterface(item))) return undefined;
      return data.map(item => this.generateModel(item));
    }
    if (this.validateInterface(data)) {
      return this.generateModel(data);
    }
    return undefined;
  }
}
