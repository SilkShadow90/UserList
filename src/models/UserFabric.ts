import { IUser, User } from './User';
import { BasicFabric } from './BasicFabric';
import { isObject } from '../utils';

export class UserFabric extends BasicFabric<User, IUser> {
  private static readonly instance = new UserFabric();

  protected validateInterface(model: unknown): model is IUser {
    return (
      isObject(model) &&
      'id' in model &&
      'first_name' in model &&
      'last_name' in model
    );
  }

  protected validateModel(model: unknown): model is User {
    return (
      isObject(model) &&
      'id' in model &&
      'firstName' in model &&
      'lastName' in model
    );
  }

  protected generateModel(data: IUser): User {
    return new User(data);
  }

  static create(data: unknown[]): User[] | undefined;
  static create(data: unknown): User | undefined;
  static create(data: unknown): User | User[] | undefined {
    return UserFabric.instance.create(data);
  }

  static checkInterface(data: unknown): data is IUser | IUser[] {
    return UserFabric.instance.checkInterface(data);
  }

  static checkModel(data: unknown[]): data is User[];
  static checkModel(data: unknown): data is User;
  static checkModel(data: unknown): data is User | User[] {
    return UserFabric.instance.checkModel(data);
  }
}
