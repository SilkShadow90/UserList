import { UserApi } from '../../api/UserApi';
import { UserReducerType } from '../reducers/user';
import { AppThunk } from '../index';
import { delay } from '../../utils';
import { User } from '../../models';

const actionUserStartFetch = (id: number) => ({ type: UserReducerType['user/startFetch'], payload: { id } });
const actionUserCompletedFetch = (user: User) => ({
  type: UserReducerType['user/completedFetch'],
  payload: { user },
});
const actionUserClearCompleted = { type: UserReducerType['user/clearCompleted'], payload: {} };
const actionUserErrorFetch = { type: UserReducerType['user/errorFetch'], payload: {} };

export const fetchUser =
  (id: number): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch(actionUserStartFetch(id));

    await delay(1000);
    const user = await UserApi.getUser(id);

    if (user) {
      dispatch(actionUserCompletedFetch(user));
      dispatch(actionUserClearCompleted);
    } else {
      dispatch(actionUserErrorFetch);
    }
  };
