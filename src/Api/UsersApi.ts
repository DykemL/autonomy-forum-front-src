import { UserExtended } from './Contracts/Common';
import { Guid } from "../Common/Types";
import ApiClient, { RequestResult } from "./ApiClient";

export default class UsersApi {
  async getUserExtended(userId: Guid): Promise<RequestResult<UserExtended>> {
    return await ApiClient.get('users', userId);
  }

  async isUserNameExists(userName: string): Promise<RequestResult<boolean>> {
    return await ApiClient.get(`users/is-exists/${userName}`);
  }

  async addUserRole(userId: Guid, role: string): Promise<RequestResult<string>> {
    return await ApiClient.post(`users/${userId}/add-role?role=${role}`);
  }

  async removeFromRole(userId: Guid, role: string): Promise<RequestResult<string>> {
    return await ApiClient.post(`users/${userId}/remove-role?role=${role}`);
  }

  async attachAvatar(fileId: Guid): Promise<RequestResult> {
    return await ApiClient.post(`users/attach-avatar`, fileId);
  }
}