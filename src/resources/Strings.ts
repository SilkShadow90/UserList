import { NavigationScreens } from '../types/navigationScreens';

const screenNames: Record<NavigationScreens, string> = {
  [NavigationScreens.Home]: 'Список пользователей',
  [NavigationScreens.Details]: 'Данные пользователя',
};

export const Strings = {
  screenNames,
  errors: {
    someError: 'Что-то пошло не так!!!',
    validateError: 'Данные не прошли валидацию!',
  },
  global: {
    continue: 'Продолжить',
  },
} as const;
