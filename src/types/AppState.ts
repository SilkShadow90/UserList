/**
 * AppState - интерфейс хранилища Redux
 */

import { User } from '../models';
import { Pagination } from '../models';

export interface AppState {
  usersState: {
    isLoading?: boolean;
    isError?: boolean;
    isLoadingMore?: boolean;
    isErrorMore?: boolean;
    users?: User[];
    pagination?: Pagination;
  };
  userState: {
    isLoading?: boolean;
    isError?: boolean;
    user?: User | null;
    id?: number;
  };
}
