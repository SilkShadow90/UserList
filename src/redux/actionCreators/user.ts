import { UserApi } from '../../api/UserApi';
import { UserReducerType } from '../reducers/user';
import { AppThunk } from '../index';
import { User } from '../../models';

const actionUserStartFetch = (id: number) => ({ type: UserReducerType.startFetch, payload: { id } });
const actionUserCompletedFetch = (user: User) => ({
  type: UserReducerType.completedFetch,
  payload: { user },
});
const actionUserClearCompleted = { type: UserReducerType.clearCompleted };
const actionUserErrorFetch = { type: UserReducerType.errorFetch };

export const fetchUser =
  (id: number): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch(actionUserStartFetch(id));

    const user = await UserApi.getUser(id);

    if (user) {
      dispatch(actionUserCompletedFetch(user));
      dispatch(actionUserClearCompleted);
    } else {
      dispatch(actionUserErrorFetch);
    }
  };
