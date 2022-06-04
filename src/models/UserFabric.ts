import { IUser, User } from './User';
import { BasicFabric, FabricMixins, staticImplements } from './BasicFabric';

@staticImplements<FabricMixins<User>>()
export class UserFabric extends BasicFabric<User, IUser> {
  private static instance?: UserFabric;
  validateModel(model: object): model is User {
    return Object.keys(User.prototype).every(property => model.hasOwnProperty(property));
  }

  validateInterface(model: object): model is IUser {
    return model.hasOwnProperty('id') && model.hasOwnProperty('first_name') && model.hasOwnProperty('last_name');
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
