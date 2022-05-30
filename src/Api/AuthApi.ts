import { UserExtended } from './Contracts/Common';
import ApiClient, { RequestResult } from './ApiClient';
import { RegisterRequest, RegisterResponse, LoginRequest } from './Contracts/Auth';

export default class AuthApi {
  async register(registerRequest: RegisterRequest): Promise<RequestResult<RegisterResponse>> {
    return await ApiClient.post('auth/register', registerRequest);
  }

  async login(loginRequest: LoginRequest): Promise<RequestResult<UserExtended>> {
    return await ApiClient.post('auth/login', loginRequest);
  }

  async refresh(): Promise<RequestResult<UserExtended>> {
    return await ApiClient.post('auth/refresh');
  }

  async current(): Promise<RequestResult<UserExtended>> {
    return await ApiClient.get('auth/current');
  }
}