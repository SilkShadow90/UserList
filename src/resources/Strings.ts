import { NavigationScreens } from '../types';

const screenNames: Record<NavigationScreens, string> = {
  [NavigationScreens.Home]: 'Список пользователей',
  [NavigationScreens.Details]: 'Данные пользователя',
};

export const Strings = {
  screenNames,
  errors: {
    someError: 'Что-то пошло не так!!!',
    validateError: 'Данные не соответствуют ожидаемой модели!',
    notFound: 'Данные не найдены!',
  },
  global: {
    continue: 'Продолжить',
    retry: 'Попробовать снова',
    noData: 'Нет данных',
    back: 'Назад',
  },
  user: {
    name: 'Имя',
    lastName: 'Фамилия',
    email: 'e-mail',
    allUpload: 'Список пользователей полностью загружен',
  },
} as const;
