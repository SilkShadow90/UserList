import { IUser, User } from './User';
import { BasicFabric, FabricMixins, staticImplements } from './BasicFabric';

@staticImplements<FabricMixins<IUser>>()
export class UserFabric extends BasicFabric<IUser> {
  private static instance?: UserFabric;
  validateModel(model: unknown): model is IUser {
    return !!(model as IUser).first_name && !!(model as IUser).last_name;
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

  public static check(data: unknown): boolean {
    if (!UserFabric.instance) {
      UserFabric.instance = new UserFabric();
    }

    return UserFabric.instance.validate(data);
  }
}
