import { AppState } from '../../types';
import { initialState } from '../initialState';

export enum UserReducerType {
  'user/startFetch' = 'user/startFetch',
  'user/completedFetch' = 'user/completedFetch',
  'user/errorFetch' = 'user/errorFetch',
  'user/clearCompleted' = 'user/clearCompleted',
}

export type UserAction = {
  type: UserReducerType;
  payload: AppState['userState'];
};

export function userReducer(
  state: AppState['userState'] = initialState.userState,
  action: UserAction,
): AppState['userState'] {
  switch (action.type) {
    case UserReducerType['user/startFetch']:
      return { user: null, isLoading: true, isError: false, id: action.payload.id };
    case UserReducerType['user/completedFetch']:
      return { user: action.payload?.user, isLoading: false, isError: false, id: state.id };
    case UserReducerType['user/clearCompleted']:
      return { user: state?.user, isLoading: false, isError: false, id: undefined };
    case UserReducerType['user/errorFetch']:
      return { user: null, isLoading: false, isError: true, id: state.id };
    default:
      return state;
  }
}
