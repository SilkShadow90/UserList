module.exports = {
  getModelTemplate: model => `export interface I${model} {
  property_one: any;
  property_two: any;
}

export class ${model} {
  propertyOne: any;
  propertyTwo: any;

  public constructor(model: I${model}) {
    this.propertyOne = model.property_one;
    this.propertyTwo = model.property_two;
  }
}
`,
};
