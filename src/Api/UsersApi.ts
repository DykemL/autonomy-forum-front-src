import { UserExtended } from './Contracts/Common';
import { Guid } from "../Common/Types";
import ApiClient, { RequestResult } from "./ApiClient";

export default class UsersApi {
  async getUserExtended(userId: Guid): Promise<RequestResult<UserExtended>> {
    return await ApiClient.get('Users', userId);
  }
}