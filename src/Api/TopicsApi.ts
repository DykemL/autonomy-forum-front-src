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
    return await ApiClient.put('Topics', request);
  }

  async findTopicById(topicId: Guid): Promise<RequestResult<Topic>> {
    return await ApiClient.get('Topics', topicId);
  }
}