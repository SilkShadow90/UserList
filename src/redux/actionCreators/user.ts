import { UserApi } from '../../api/UserApi';
import { UserReducerType } from '../reducers/user';
import { AppThunk } from '../index';

export const fetchUser =
  (id: number): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch({ type: UserReducerType['user/startFetch'], payload: { id } });

    setTimeout(async () => {
      const user = await UserApi.getUser(id);

      if (user) {
        dispatch({ type: UserReducerType['user/completedFetch'], payload: { user } });
        dispatch({ type: UserReducerType['user/clearCompleted'], payload: {} });
      } else {
        dispatch({ type: UserReducerType['user/errorFetch'], payload: {} });
      }
    }, 1000);
  };
