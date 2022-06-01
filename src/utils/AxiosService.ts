import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AlertService } from './AlertService';

type Support = {
  url: string;
  text: string;
};

export type SingleResponse<T> = {
  data: T;
  support: Support;
};

export type ListResponse<T> = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
} & SingleResponse<T>;

export class AxiosService {
  private static _instance?: AxiosInstance;

  private static get instance(): AxiosInstance {
    if (AxiosService._instance) {
      return AxiosService._instance;
    }

    AxiosService._instance = axios.create({
      baseURL: 'https://reqres.in/api',
    });

    return this.instance;
  }

  public static async get<T>(url: string, validateFunc?: (data: T) => boolean): Promise<AxiosResponse<T> | void> {
    try {
      const response = await AxiosService.instance.get<T>(url);
      const isSuccess = AxiosService.isSuccess(response.status);

      if (isSuccess && (validateFunc ? validateFunc(response.data) : true)) {
        return response;
      }

      if (isSuccess && validateFunc) {
        throw new Error('Данные не прошли валидацию!');
      }

      throw new Error('Что-то пошло не так!!!');
    } catch (error) {
      await AxiosService.showError((error as Error)?.message);
    }
  }

  public static isSuccess(status: number): boolean {
    return status === 200;
  }

  private static async showError(text?: string): Promise<void> {
    await AlertService.showAlert({ title: text ?? 'Что-то пошло не так!!!' });
  }
}
