import { UserExtended } from './Contracts/Common';
import ApiClient, { RequestResult } from './ApiClient';
import { RegisterRequest, RegisterResponse, LoginRequest } from './Contracts/Auth';

export default class AuthApi {
  async register(registerRequest: RegisterRequest): Promise<RequestResult<RegisterResponse>> {
    return await ApiClient.post('Auth/Register', registerRequest);
  }

  async login(loginRequest: LoginRequest): Promise<RequestResult<UserExtended>> {
    return await ApiClient.post('Auth/Login', loginRequest);
  }

  async refresh(): Promise<RequestResult<UserExtended>> {
    return await ApiClient.post('Auth/Refresh');
  }

  async current(): Promise<RequestResult<UserExtended>> {
    return await ApiClient.get('Auth/Current');
  }
}