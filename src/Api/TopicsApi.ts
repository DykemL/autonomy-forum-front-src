import { Guid } from '../Common/Types';
import ApiClient, { RequestResult } from './ApiClient';
import { CreateTopicRequest, Topic } from './Contracts/Topics';

export default class TopicsApi {
  async createTopic(title: string, titleMessage: string, sectionId: Guid): Promise<RequestResult> {
    const request: CreateTopicRequest = {
      title: title,
      titleMessage: titleMessage,
      sectionId: sectionId
    }
    return await ApiClient.put('topics', request);
  }

  async findTopicById(topicId: Guid): Promise<RequestResult<Topic>> {
    return await ApiClient.get('topics', topicId);
  }

  async deleteTopic(topicId: Guid): Promise<RequestResult> {
    return await ApiClient.delete('topics', topicId);
  }
}