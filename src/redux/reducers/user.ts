import { User } from '../../models';
import { AppState } from '../../types';
import { initialState } from '../initialState';

export enum UserReducerType {
  startFetch = 'user/startFetch',
  completedFetch = 'user/completedFetch',
  errorFetch = 'user/errorFetch',
  clearCompleted = 'user/clearCompleted',
}

export type UserAction =
  | { type: UserReducerType.startFetch; payload: { id: number } }
  | { type: UserReducerType.completedFetch; payload: { user: User } }
  | { type: UserReducerType.errorFetch }
  | { type: UserReducerType.clearCompleted };

export function userReducer(
  state: AppState['userState'] = initialState.userState,
  action: UserAction,
): AppState['userState'] {
  switch (action.type) {
    case UserReducerType.startFetch:
      return { user: null, isLoading: true, isError: false, id: action.payload.id };
    case UserReducerType.completedFetch:
      return { user: action.payload.user, isLoading: false, isError: false, id: state.id };
    case UserReducerType.clearCompleted:
      return { user: state?.user, isLoading: false, isError: false, id: undefined };
    case UserReducerType.errorFetch:
      return { user: null, isLoading: false, isError: true, id: state.id };
    default:
      return state;
  }
}
