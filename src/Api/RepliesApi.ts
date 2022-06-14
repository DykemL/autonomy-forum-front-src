import { Guid } from "../Common/Types";
import ApiClient, { RequestResult } from "./ApiClient";
import { CreateReplyRequest } from "./Contracts/Replies";

export default class RepliesApi {
  async createReply(message: string, topicId: Guid): Promise<RequestResult> {
    const request: CreateReplyRequest = {
      message: message,
      topicId: topicId
    }
    return await ApiClient.put('replies', request);
  }

  async deleteReply(replyId: Guid): Promise<RequestResult> {
    return await ApiClient.delete('replies', replyId);
  }

  async doLikeReply(replyId: Guid): Promise<RequestResult> {
    return await ApiClient.post('replies/'+ replyId +'/like');
  }

  async cancelLikeReply(replyId: Guid): Promise<RequestResult> {
    return await ApiClient.post('replies/'+ replyId +'/cancel-like');
  }
}