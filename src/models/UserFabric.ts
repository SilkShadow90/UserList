import { IUser, User } from './User';
import { BasicFabric, FabricMixins, staticImplements } from './BasicFabric';
import { isObject } from '../utils';

@staticImplements<FabricMixins<User>>()
export class UserFabric extends BasicFabric<User, IUser> {
  private static instance?: UserFabric;
  validateModel(model: unknown): model is User {
    return isObject(model) && Object.keys(User.prototype).every(property => model.hasOwnProperty(property));
  }

  validateInterface(model: unknown): model is IUser {
    return (
      isObject(model) &&
      model.hasOwnProperty('id') &&
      model.hasOwnProperty('first_name') &&
      model.hasOwnProperty('last_name')
    );
  }

  generateModel(userData: IUser): User {
    return new User(userData);
  }

  public static create(data: unknown): User | User[] | void {
    if (!UserFabric.instance) {
      UserFabric.instance = new UserFabric();
    }

    return UserFabric.instance.generate(data);
  }

  public static checkInterface(data: unknown): data is IUser | IUser[] {
    if (!UserFabric.instance) {
      UserFabric.instance = new UserFabric();
    }

    return UserFabric.instance.initialValidate(data);
  }

  public static checkModel(data: unknown): data is User | User[] {
    if (!UserFabric.instance) {
      UserFabric.instance = new UserFabric();
    }

    return UserFabric.instance.endValidate(data);
  }
}
