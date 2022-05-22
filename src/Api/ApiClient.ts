import process from 'process'
import { Nullable } from '../Common/Types';
import snackbarService from '../Services/SnackbarService';

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

class ApiClientImpl {
  private apiUrl: string;
  private timeout: number = 5000;

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL!;
  }

  async post<TResultBody, TRequestBody>(path: string, body: TRequestBody): Promise<RequestResult<TResultBody>> {
    return await this.send(`${this.apiUrl}/${path}`, 'post', body);
  }

  private async send<TResultBody, TRequestBody>(path: string, method: string, body?: TRequestBody): Promise<RequestResult<TResultBody>> {
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
        snackbarService.push('Ошибка при выполнении запроса', 'error');
      }

      return;
    });

    let resultBody: Nullable<TResultBody>;
    try {
      resultBody = result && await result.json();
    } catch {}
    return new RequestResult<TResultBody>(result?.status, resultBody);
  }
}

const ApiClient = new ApiClientImpl();
export default ApiClient;