import { AxiosService, ListResponse, SingleResponse } from '../utils/AxiosService';
import { isUser, User } from '../models/User';

export class UserApi {
  private static checkUsersValidate(data?: ListResponse<User[]> | SingleResponse<User>): boolean {
    const { data: userData } = data || {};

    return Array.isArray(userData) ? userData.every(user => isUser(user)) : isUser(userData);
  }

  public static async getUsers(page: number = 1): Promise<User[]> {
    const query = `/users?page=${page}`;

    const { data } = (await AxiosService.get<ListResponse<User[]>>(query, UserApi.checkUsersValidate)) || {};

    return data?.data || [];
  }

  public static async getUser(id: number): Promise<User | undefined> {
    const query = `/users/${id}`;

    const { data } = (await AxiosService.get<SingleResponse<User>>(query, UserApi.checkUsersValidate)) || {};

    return data?.data;
  }
}
