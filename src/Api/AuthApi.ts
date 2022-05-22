import snackbarService from '../Services/SnackbarService';
import ApiClient, { RequestResult } from './ApiClient';
import { RegisterRequest, RegisterResponse, LoginRequest } from './Contracts/Auth';

export default class AuthApi {
  async register(registerRequest: RegisterRequest): Promise<RequestResult<RegisterResponse>> {
    return await ApiClient.post('Auth/Register', registerRequest);
  }

  async login(loginRequest: LoginRequest): Promise<RequestResult> {
    return await ApiClient.post('Auth/Login', loginRequest);
  }
}