import { User, Pagination } from '../../models';
import { AppState } from '../../types';
import { initialState } from '../initialState';

export enum UsersReducerType {
  startFetch = 'users/startFetch',
  completedFetch = 'users/completedFetch',
  errorFetch = 'users/errorFetch',
  startMoreFetch = 'users/startMoreFetch',
  completedMoreFetch = 'users/completedMoreFetch',
  errorMoreFetch = 'users/errorMoreFetch',
}

export type UsersAction =
  | { type: UsersReducerType.startFetch }
  | { type: UsersReducerType.completedFetch; payload: { users: User[]; pagination: Pagination } }
  | { type: UsersReducerType.errorFetch }
  | { type: UsersReducerType.startMoreFetch }
  | { type: UsersReducerType.completedMoreFetch; payload: { users: User[]; pagination: Pagination } }
  | { type: UsersReducerType.errorMoreFetch };

export function usersReducer(
  state: AppState['usersState'] = initialState.usersState,
  action: UsersAction,
): AppState['usersState'] {
  switch (action.type) {
    case UsersReducerType.startFetch:
      return { ...state, pagination: undefined, isLoading: true, isError: false };
    case UsersReducerType.completedFetch:
      return { ...state, users: action.payload.users, pagination: action.payload.pagination, isLoading: false, isError: false };
    case UsersReducerType.errorFetch:
      return { ...state, pagination: undefined, users: [], isLoading: false, isError: true };
    case UsersReducerType.startMoreFetch:
      return { ...state, isLoadingMore: true, isErrorMore: false };
    case UsersReducerType.completedMoreFetch:
      return {
        ...state,
        users: [...(state.users || []), ...action.payload.users],
        pagination: action.payload.pagination,
        isLoadingMore: false,
        isErrorMore: false,
      };
    case UsersReducerType.errorMoreFetch:
      return { ...state, isLoadingMore: false, isErrorMore: true };
    default:
      return state;
  }
}
