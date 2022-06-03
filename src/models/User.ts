export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  avatar?: string;
}

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  avatar?: string;

  public constructor(model: IUser) {
    this.id = model.id;
    this.email = model.email;
    this.firstName = model.first_name;
    this.lastName = model.last_name;
    this.avatar = model.avatar;
  }
}
