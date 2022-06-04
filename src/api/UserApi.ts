import { AxiosService } from '../utils';
import { User, UserFabric } from '../models';
import { PaginationFabric, Pagination } from '../models';

type UserList = {
  users: User[];
  pagination: Pagination;
};

export class UserApi {
  public static async getUsers(page: number = 1): Promise<UserList | void> {
    const query = `/users?page=${page}`;
    const response = await AxiosService.get<User>(query, UserFabric.checkInterface);

    const pagination = PaginationFabric.create(response?.data);
    const users = response?.data?.data && (UserFabric.create(response.data.data) as User[]);

    if (UserFabric.checkModel(users) && PaginationFabric.checkModel(pagination)) {
      return { users, pagination };
    }
  }

  public static async getUser(id: number): Promise<User | undefined> {
    const query = `/users/${id}`;
    const response = await AxiosService.get<User>(query, UserFabric.checkInterface);

    return response?.data?.data && (UserFabric.create(response.data.data) as User);
  }
}
