module.exports = {
  getModelFabricTemplate: model => `import { I${model}, ${model} } from './${model}';
import { BasicFabric, FabricMixins, staticImplements } from './BasicFabric';
import { isObject } from '../utils';

@staticImplements<FabricMixins<${model}>>()
export class ${model}Fabric extends BasicFabric<${model}, I${model}> {
  private static instance?: ${model}Fabric;
  validateModel(model: unknown): model is ${model} {
    return isObject(model) && Object.keys(${model}.prototype).every(property => model.hasOwnProperty(property));
  }

  validateInterface(model: unknown): model is I${model} {
    return isObject(model) && model.hasOwnProperty('property_one') && model.hasOwnProperty('property_two');
  }

  generateModel(${model}Data: I${model}): ${model} {
    return new ${model}(${model}Data);
  }

  public static create(data: unknown): ${model} | ${model}[] | void {
    if (!${model}Fabric.instance) {
      ${model}Fabric.instance = new ${model}Fabric();
    }

    return ${model}Fabric.instance.generate(data);
  }

  public static checkInterface(data: unknown): data is I${model} | I${model}[] {
    if (!${model}Fabric.instance) {
      ${model}Fabric.instance = new ${model}Fabric();
    }

    return ${model}Fabric.instance.initialValidate(data);
  }

  public static checkModel(data: unknown): data is ${model} | ${model}[] {
    if (!${model}Fabric.instance) {
      ${model}Fabric.instance = new ${model}Fabric();
    }

    return ${model}Fabric.instance.endValidate(data);
  }
}
`,
};
