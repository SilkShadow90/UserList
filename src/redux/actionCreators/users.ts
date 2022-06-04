import { UserApi } from '../../api/UserApi';
import { UsersReducerType } from '../reducers/users';
import { AppThunk } from '../index';
import { delay } from '../../utils';
import { Pagination, User } from '../../models';

const actionUsersStartFetch = { type: UsersReducerType['users/startFetch'], payload: {} };
const actionUsersCompletedFetch = (users: User[], pagination: Pagination) => ({
  type: UsersReducerType['users/completedFetch'],
  payload: { users, pagination },
});
const actionUsersErrorFetch = { type: UsersReducerType['users/errorFetch'], payload: {} };

const actionUsersStartMoreFetch = { type: UsersReducerType['users/startMoreFetch'], payload: {} };
const actionUsersCompletedMoreFetch = (users: User[], pagination: Pagination) => ({
  type: UsersReducerType['users/completedMoreFetch'],
  payload: { users, pagination },
});
const actionUsersErrorMoreFetch = { type: UsersReducerType['users/errorMoreFetch'], payload: {} };

export const fetchUsers =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch(actionUsersStartFetch);

    await delay(1000);
    const { users = [], pagination } = (await UserApi.getUsers()) || {};

    if (Array.isArray(users) && pagination) {
      dispatch(actionUsersCompletedFetch(users, pagination));
    } else {
      dispatch(actionUsersErrorFetch);
    }
  };

export const fetchMoreUsers =
  (): AppThunk =>
  async (dispatch, getState): Promise<void> => {
    dispatch(actionUsersStartMoreFetch);

    const { users = [], pagination } =
      (await UserApi.getUsers((getState().usersState?.pagination?.currentPage || 1) + 1)) || {};

    if (Array.isArray(users) && pagination) {
      dispatch(actionUsersCompletedMoreFetch(users, pagination));
    } else {
      dispatch(actionUsersErrorMoreFetch);
    }
  };
