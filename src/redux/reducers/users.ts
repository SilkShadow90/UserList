import { AppState } from '../../types';
import { initialState } from '../initialState';

export enum UsersReducerType {
  'users/startFetch' = 'users/startFetch',
  'users/completedFetch' = 'users/completedFetch',
  'users/errorFetch' = 'users/errorFetch',
  'users/startMoreFetch' = 'users/startMoreFetch',
  'users/completedMoreFetch' = 'users/completedMoreFetch',
  'users/errorMoreFetch' = 'users/errorMoreFetch',
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
      return {
        ...state,
        pagination: undefined,
        users: state.users,
        isLoading: true,
        isError: false,
      };
    case UsersReducerType['users/completedFetch']:
      return {
        ...state,
        pagination: action.payload.pagination,
        users: action.payload.users,
        isLoading: false,
        isError: false,
      };
    case UsersReducerType['users/errorFetch']:
      return {
        ...state,
        pagination: undefined,
        users: [],
        isLoading: false,
        isError: true,
      };

    case UsersReducerType['users/startMoreFetch']:
      return {
        ...state,
        pagination: state.pagination,
        users: state.users,
        isLoadingMore: true,
        isErrorMore: false,
      };
    case UsersReducerType['users/completedMoreFetch']:
      return {
        ...state,
        pagination: action.payload.pagination,
        users: [...(state.users || []), ...(action.payload.users || [])],
        isLoadingMore: false,
        isErrorMore: false,
      };
    case UsersReducerType['users/errorMoreFetch']:
      return {
        ...state,
        pagination: state.pagination,
        users: state.users,
        isLoadingMore: false,
        isErrorMore: true,
      };
    default:
      return state;
  }
}
