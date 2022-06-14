import { PrivateMessage } from './Contracts/PrivateMessages';
import { Guid } from '../Common/Types';
import ApiClient, { RequestResult } from './ApiClient';
import { File } from './Contracts/Files';
import { UserInfo } from './Contracts/Common';

export default class PrivateMessagesApi {
  async getMessages(collocutorId: Guid): Promise<RequestResult<PrivateMessage[]>> {
    return await ApiClient.get(`messages/${collocutorId}`);
  }

  async getCollocutors(): Promise<RequestResult<UserInfo[]>> {
    return await ApiClient.get('messages');
  }

  async addMessage(receiverId: Guid, message: string): Promise<RequestResult> {
    return await ApiClient.post('messages/add', {receiverId: receiverId, message: message});
  }
}