import { IUser, User } from './User';
import { BasicFactory } from './BasicFactory';
import { isObject } from '../utils';

export class UserFactory extends BasicFactory<User, IUser> {
  private static readonly instance = new UserFactory();

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
    return UserFactory.instance.create(data);
  }

  static checkInterface(data: unknown): data is IUser | IUser[] {
    return UserFactory.instance.checkInterface(data);
  }

  static checkModel(data: unknown[]): data is User[];
  static checkModel(data: unknown): data is User;
  static checkModel(data: unknown): data is User | User[] {
    return UserFactory.instance.checkModel(data);
  }
}
