import { UserApi } from '../../api/UserApi';
import { UsersReducerType } from '../reducers/users';
import { AppThunk } from '../index';
import { Pagination, User } from '../../models';

const actionUsersStartFetch = { type: UsersReducerType.startFetch };
const actionUsersCompletedFetch = (users: User[], pagination: Pagination) => ({
  type: UsersReducerType.completedFetch,
  payload: { users, pagination },
});
const actionUsersErrorFetch = { type: UsersReducerType.errorFetch };

const actionUsersStartMoreFetch = { type: UsersReducerType.startMoreFetch };
const actionUsersCompletedMoreFetch = (users: User[], pagination: Pagination) => ({
  type: UsersReducerType.completedMoreFetch,
  payload: { users, pagination },
});
const actionUsersErrorMoreFetch = { type: UsersReducerType.errorMoreFetch };

export const fetchUsers =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch(actionUsersStartFetch);

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
