import { IUser, User } from './User';
import { BasicFabric, FabricMixins, staticImplements } from './BasicFabric';

@staticImplements<FabricMixins<User>>()
export class UserFabric extends BasicFabric<User> {
  private static instance?: UserFabric;
  validateModel(model: unknown): model is User {
    return (
      !!((model as IUser)?.first_name && (model as IUser)?.last_name) ||
      !!((model as User)?.firstName && (model as User)?.lastName)
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

  public static check(data: unknown): data is User | User[] {
    if (!UserFabric.instance) {
      UserFabric.instance = new UserFabric();
    }

    return UserFabric.instance.validate(data);
  }
}
