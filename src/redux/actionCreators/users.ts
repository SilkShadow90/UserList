import { UserApi } from '../../api/UserApi';
import { UsersReducerType } from '../reducers/users';
import { AppThunk } from '../index';
import { delay } from '../../utils/common';

export const fetchUsers =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch({ type: UsersReducerType['users/startFetch'], payload: {} });

    await delay(1000);
    const users = await UserApi.getUsers();

    if (Array.isArray(users)) {
      dispatch({ type: UsersReducerType['users/completedFetch'], payload: { users } });
    } else {
      dispatch({ type: UsersReducerType['users/errorFetch'], payload: {} });
    }
  };
