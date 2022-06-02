import { AxiosService } from '../utils/AxiosService';
import { User } from '../models/User';
import { UserFabric } from '../models/UserFabric';

export class UserApi {
  public static async getUsers(page: number = 1): Promise<User[]> {
    const query = `/users?page=${page}`;
    const response = await AxiosService.get<User>(query, UserFabric.check);

    return (response?.data?.data && (UserFabric.create(response.data.data) as User[])) || [];
  }

  public static async getUser(id: number): Promise<User | undefined> {
    const query = `/users/${id}`;
    const response = await AxiosService.get<User>(query, UserFabric.check);

    return response?.data?.data && (UserFabric.create(response.data.data) as User);
  }
}
