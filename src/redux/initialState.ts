import { AppState } from './types';

export const initialState: AppState = {
  usersState: {
    isLoading: false,
    isError: false,
    users: [],
  },
  userState: {
    isLoading: false,
    isError: false,
    user: null,
    id: undefined,
  },
};
