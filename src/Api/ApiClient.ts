import process from 'process'
import { Nullable } from '../Common/Types';
import snackbarService from '../Services/SnackbarService';
import userService from '../Services/UserService';

export class RequestResult<TBody = undefined> {
  code?: number;
  body?: TBody;

  constructor (code?: number, body?: TBody) {
    this.code = code;
    this.body = body;
  }

  ensureSuccess = (): boolean => this.code != undefined && this.code >= 200 && this.code < 300;
}

const REQUEST_FAILED: string = 'Failed to fetch';

class ApiClient {
  private apiUrl: string;
  private timeout: number = 10000;

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL!;
  }

  async post<TResultBody, TRequestBody>(path: string, body?: TRequestBody): Promise<RequestResult<TResultBody>> {
    return await this.send(`${this.apiUrl}/${path}`, 'post', body);
  }

  async get<TResultBody>(path: string, parameter?: string): Promise<RequestResult<TResultBody>> {
    let url = `${this.apiUrl}/${path}`;
    if (parameter !== undefined) {
      url = url + '/' + parameter
    }
    return await this.send(url, 'get');
  }

  async put<TResultBody, TRequestBody>(path: string, body?: TRequestBody): Promise<RequestResult<TResultBody>> {
    return await this.send(`${this.apiUrl}/${path}`, 'put', body);
  }

  async delete<TResultBody>(path: string, parameter?: string): Promise<RequestResult<TResultBody>> {
    let url = `${this.apiUrl}/${path}`;
    if (parameter !== undefined) {
      url = url + '/' + parameter
    }
    return await this.send(url, 'delete');
  }

  async patch<TResultBody, TRequestBody>(path: string, body?: TRequestBody): Promise<RequestResult<TResultBody>> {
    let url = `${this.apiUrl}/${path}`;
    return await this.send(url, 'patch', body);
  }

  private async send<TResultBody, TRequestBody>(path: string, method: string, body?: TRequestBody): Promise<RequestResult<TResultBody>> {
    await userService.updateAuthorizationState();
    const controller = new AbortController();
    setTimeout(() => controller.abort(), this.timeout);
    const request = new Request(path, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      signal: controller.signal,
      mode: 'cors',
      credentials: 'include',
      body: body && JSON.stringify(body)
    });

    const result = await fetch(request).catch(error => {
      if (error?.message === REQUEST_FAILED) {
        snackbarService.push('Ошибка соединения с сервером', 'error');
      }

      return;
    });

    let resultBody: Nullable<TResultBody>;
    try {
      resultBody = result && await result.json();
    } catch {}
    if (result?.status == 403) {
      snackbarService.push('Недостаточно прав для выполнения действия', 'warning');
    }
    return new RequestResult<TResultBody>(result?.status, resultBody);
  }
}

const apiClient = new ApiClient();
export default apiClient;