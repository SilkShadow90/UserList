import { IModelTemplate, ModelTemplate } from './ModelTemplate';
import { BasicFabric, FabricMixins, staticImplements } from '../src/models/BasicFabric';
import { isObject } from '../src/utils';

@staticImplements<FabricMixins<ModelTemplate>>()
export class ModelTemplateFabric extends BasicFabric<ModelTemplate, IModelTemplate> {
  private static instance?: ModelTemplateFabric;
  validateModel(model: unknown): model is ModelTemplate {
    return isObject(model) && Object.keys(ModelTemplate.prototype).every(property => model.hasOwnProperty(property));
  }

  validateInterface(model: unknown): model is IModelTemplate {
    return isObject(model) && model.hasOwnProperty('property_one') && model.hasOwnProperty('property_two');
  }

  generateModel(ModelTemplateData: IModelTemplate): ModelTemplate {
    return new ModelTemplate(ModelTemplateData);
  }

  public static create(data: unknown): ModelTemplate | ModelTemplate[] | void {
    if (!ModelTemplateFabric.instance) {
      ModelTemplateFabric.instance = new ModelTemplateFabric();
    }

    return ModelTemplateFabric.instance.generate(data);
  }

  public static checkInterface(data: unknown): data is IModelTemplate | IModelTemplate[] {
    if (!ModelTemplateFabric.instance) {
      ModelTemplateFabric.instance = new ModelTemplateFabric();
    }

    return ModelTemplateFabric.instance.initialValidate(data);
  }

  public static checkModel(data: unknown): data is ModelTemplate | ModelTemplate[] {
    if (!ModelTemplateFabric.instance) {
      ModelTemplateFabric.instance = new ModelTemplateFabric();
    }

    return ModelTemplateFabric.instance.endValidate(data);
  }
}
