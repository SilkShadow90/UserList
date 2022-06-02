import { UserApi } from '../../api/UserApi';
import { UsersReducerType } from '../reducers/users';
import { AppThunk } from '../index';

export const fetchUsers =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch({ type: UsersReducerType['users/startFetch'], payload: {} });

    setTimeout(async () => {
      const users = await UserApi.getUsers();

      if (users?.length) {
        dispatch({ type: UsersReducerType['users/completedFetch'], payload: { users } });
      } else {
        dispatch({ type: UsersReducerType['users/errorFetch'], payload: {} });
      }
    }, 1000);
  };
