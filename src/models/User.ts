export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export class User implements IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;

  public constructor(model: IUser) {
    this.id = model.id;
    this.email = model.email;
    this.first_name = model.first_name;
    this.last_name = model.last_name;
    this.avatar = model.avatar;
  }
}
