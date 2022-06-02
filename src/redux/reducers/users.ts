import { AppState } from '../types';
import { initialState } from '../initialState';

export enum UsersReducerType {
  'users/startFetch' = 'users/startFetch',
  'users/completedFetch' = 'users/completedFetch',
  'users/errorFetch' = 'users/errorFetch',
}

export type UsersAction = {
  type: UsersReducerType;
  payload: AppState['usersState'];
};

export function usersReducer(
  state: AppState['usersState'] = initialState.usersState,
  action: UsersAction,
): AppState['usersState'] {
  switch (action.type) {
    case UsersReducerType['users/startFetch']:
      return { users: state.users, isLoading: true, isError: false };
    case UsersReducerType['users/completedFetch']:
      return { users: action.payload.users, isLoading: false, isError: false };
    case UsersReducerType['users/errorFetch']:
      return { users: [], isLoading: false, isError: true };
    default:
      return state;
  }
}
