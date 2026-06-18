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
      response => response,
      function (error) {
        if (error.response && AxiosService.notFound(error.response.status)) {
          throw new Error(Strings.errors.notFound);
        }
        return Promise.reject(error.response ?? error);
      },
    );

    return this.instance;
  }

  public static async get<T>(
    url: string,
    validateFunc?: (data: T | T[]) => boolean,
  ): Promise<AxiosResponse<Response<T>>> {
    const response = await AxiosService.instance.get<Response<T>>(url);

    if (!AxiosService.isSuccess(response.status)) {
      AxiosService.showError(Strings.errors.someError);
    }

    if (validateFunc && !validateFunc(response.data?.data)) {
      AxiosService.showError(Strings.errors.validateError);
    }

    return response;
  }

  private static isSuccess(status: number): boolean {
    return status >= 200 && status < 300;
  }

  private static notFound(status: number): boolean {
    return status === 404;
  }

  private static showError(text?: string): never {
    throw new Error(text ?? Strings.errors.someError);
  }
}
