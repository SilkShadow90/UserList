import { AxiosService } from '../utils';
import { User, UserFabric } from '../models';
import { PaginationFabric } from '../models/PaginationFabric';
import { Pagination } from '../models/Pagination';

type UserList = {
  users: User[];
  pagination: Pagination;
};

export class UserApi {
  public static async getUsers(page: number = 1): Promise<UserList | void> {
    const query = `/users?page=${page}`;
    const response = await AxiosService.get<User>(query, UserFabric.check);

    const pagination = PaginationFabric.create(response?.data);
    const users = response?.data?.data && (UserFabric.create(response.data.data) as User[]);

    if (users && pagination) {
      return { users, pagination };
    }
  }

  public static async getUser(id: number): Promise<User | undefined> {
    const query = `/users/${id}`;
    const response = await AxiosService.get<User>(query, UserFabric.check);

    return response?.data?.data && (UserFabric.create(response.data.data) as User);
  }
}
