/**
 * @name AxiosService
 * @description сервис выполнения запросов
 * @static метод get отправляет get запрос и проверяет полученные данные
 * @example AxiosService.get('url', validateFunction)
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Strings, Config } from '../resources';
import { IPagination } from '../models';

type Support = {
  url: string;
  text: string;
};

export type SingleResponse<T> = {
  data: T;
  support: Support;
};

export type ListResponse<T> = IPagination & SingleResponse<T>;

export type Response<T> = ListResponse<T[]> | SingleResponse<T>;

export class AxiosService {
  private static _instance?: AxiosInstance;

  private static get instance(): AxiosInstance {
    if (AxiosService._instance) {
      return AxiosService._instance;
    }

    AxiosService._instance = axios.create({
      baseURL: Config.baseURL,
    });

    AxiosService._instance.interceptors.response.use(
      response => {
        return response;
      },
      function (error) {
        if (AxiosService.notFound(error.response.status)) {
          throw new Error(Strings.errors.notFound);
        }
        return Promise.reject(error.response);
      },
    );

    return this.instance;
  }

  public static async get<T>(
    url: string,
    validateFunc?: (data: T | T[]) => boolean,
  ): Promise<AxiosResponse<Response<T>> | void> {
    try {
      const response = await AxiosService.instance.get<Response<T>>(url);
      const isSuccess = AxiosService.isSuccess(response.status);

      if (isSuccess && (validateFunc ? validateFunc(response.data?.data) : true)) {
        return response;
      }

      if (isSuccess && validateFunc) {
        AxiosService.showError(Strings.errors.validateError);
      }

      AxiosService.showError(Strings.errors.someError);
    } catch (error) {
      throw error;
    }
  }

  private static isSuccess(status: number): boolean {
    return status === 200;
  }

  private static notFound(status: number): boolean {
    return status === 404;
  }

  private static showError(text?: string): void {
    throw new Error(text ?? Strings.errors.someError);
  }
}
