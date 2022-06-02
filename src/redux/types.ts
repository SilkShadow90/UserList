import { User } from '../models/User';

export interface AppState {
  usersState: {
    isLoading?: boolean;
    isError?: boolean;
    users?: User[];
  };
  userState: {
    isLoading?: boolean;
    isError?: boolean;
    user?: User | null;
    id?: number;
  };
}
