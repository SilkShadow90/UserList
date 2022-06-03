import { UserApi } from '../../api/UserApi';
import { UsersReducerType } from '../reducers/users';
import { AppThunk } from '../index';
import { delay } from '../../utils/common';

export const fetchUsers =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch({ type: UsersReducerType['users/startFetch'], payload: {} });

    await delay(1000);
    const { users = [], pagination } = (await UserApi.getUsers()) || {};

    if (Array.isArray(users)) {
      dispatch({ type: UsersReducerType['users/completedFetch'], payload: { users, pagination } });
    } else {
      dispatch({ type: UsersReducerType['users/errorFetch'], payload: {} });
    }
  };

export const fetchMoreUsers =
  (): AppThunk =>
  async (dispatch, getState): Promise<void> => {
    dispatch({ type: UsersReducerType['users/startMoreFetch'], payload: {} });

    await delay(1000);
    const { users = [], pagination } =
      (await UserApi.getUsers((getState().usersState?.pagination?.currentPage || 1) + 1)) || {};

    if (Array.isArray(users)) {
      dispatch({ type: UsersReducerType['users/completedMoreFetch'], payload: { users, pagination } });
    } else {
      dispatch({ type: UsersReducerType['users/errorMoreFetch'], payload: {} });
    }
  };
