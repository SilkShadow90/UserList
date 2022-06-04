import { Linking } from 'react-native';
import { AlertService } from './AlertService';

/**
 * @name delay
 * @description может использоваться в цепочке промисов для синтетической задержки выполнения кода или для выполнения функции с задержкой
 * @param ms время задержки
 * @param func функция которая будет выполнена с задержкой
 * @return void
 */
export function delay<T>(ms: number = 1000, func?: () => T) {
  return new Promise(resolve => setTimeout(() => resolve(func), ms));
}

/**
 * @name getAbbreviation
 * @description создает из строки или массива строк аббревиатуру
 * @param strings строка или массив строк
 * @return string
 * @example getAbbreviation('example string') getAbbreviation(['example', 'string']) // EX
 */
export function getAbbreviation(...strings: string[]): string {
  return strings.map(str => str.replace(/(\S)\S+\s?/g, '$1').toUpperCase()).join('');
}

/**
 * @name mailTo
 * @description открытие приложения отправки писем
 * @param email строка содержащая email
 * @return Promise<void>
 * @example mailTo('example@mail.com')
 */
export async function mailTo(email: string): Promise<void> {
  try {
    const isAvailable = await Linking.canOpenURL(`mailto:${email}`);
    if (isAvailable) {
      await Linking.openURL(`mailto:${email}`);
    }
  } catch (error) {
    await AlertService.showAlert({ title: (error as Error)?.message });
  }
}
