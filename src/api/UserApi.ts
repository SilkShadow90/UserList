import { AlertService, AxiosService } from '../utils';
import { User, UserFabric } from '../models';
import { PaginationFabric, Pagination } from '../models';

type UserList = {
  users: User[];
  pagination: Pagination;
};

export class UserApi {
  public static async getUsers(page: number = 1): Promise<UserList | void> {
    const query = `/users?page=${page}`;

    try {
      const response = await AxiosService.get<User>(query, UserFabric.checkInterface);
      if (!response) return;

      const rawData = response.data?.data;
      if (!Array.isArray(rawData)) return;

      const users = UserFabric.create(rawData);
      const pagination = PaginationFabric.create(response.data);

      if (users && pagination) {
        return { users, pagination };
      }
    } catch (error) {
      await AlertService.showAlert({ title: (error as Error).message });
    }
  }

  public static async getUser(id: number): Promise<User | undefined> {
    const query = `/users/${id}`;

    try {
      const response = await AxiosService.get<User>(query, UserFabric.checkInterface);
      if (!response) return;

      const rawData = response.data?.data;
      return Array.isArray(rawData) ? undefined : UserFabric.create(rawData);
    } catch (error) {
      await AlertService.showAlert({ title: (error as Error).message });
    }
  }
}
