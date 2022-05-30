import { UserExtended } from './Contracts/Common';
import { Guid } from "../Common/Types";
import ApiClient, { RequestResult } from "./ApiClient";

export default class UsersApi {
  async getUserExtended(userId: Guid): Promise<RequestResult<UserExtended>> {
    return await ApiClient.get('users', userId);
  }

  async addUserRole(userId: Guid, role: string): Promise<RequestResult<string>> {
    return await ApiClient.post(`users/${userId}/add-role?role=${role}`)
  }

  async removeFromRole(userId: Guid, role: string): Promise<RequestResult<string>> {
    return await ApiClient.post(`users/${userId}/remove-role?role=${role}`)
  }
}