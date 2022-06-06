export interface IModelTemplate {
  property_one: any;
  property_two: any;
}

export class ModelTemplate {
  propertyOne: any;
  propertyTwo: any;

  public constructor(model: IModelTemplate) {
    this.propertyOne = model.property_one;
    this.propertyTwo = model.property_two;
  }
}
